// jsPsych imports
import { initJsPsych } from 'jspsych';
import jsPsychFullScreen from '@jspsych/plugin-fullscreen';
import jsPsychSurveyText from '@jspsych/plugin-survey-text';
import Papa from 'papaparse';

// Firebase imports
import { RoarFirekit } from '@bdelab/roar-firekit';
import { roarConfig } from './firebaseConfig';

function configTaskInfo() {
  // TODO: Edit taskInfo here. The information will be used to populate the task
  // metadata in the Firestore database.
  const taskInfo = {
    taskId: '{{kebab name}}',
    taskName: '{{capital name space=true}}',
    variantName: '{{kebab variant}}',
    taskDescription: '{{description}}',
    variantDescription: '{{variantDescription}}',
    // TODO: Edit the blocks below to better reflect your task/variant
    blocks: [
      {
        blockNumber: 0,
        trialMethod: 'fixed', // could be "random", "adaptive", "fixed", etc.
        corpus: 'practice_block', // should be the name or URL of some corpus
      },
      {
        blockNumber: 1,
        trialMethod: 'fixed', // could be "random", "adaptive", "fixed", etc.
        corpus: 'exercise_block', // should be the name or URL of some corpus
      },
    ],
  };

  return taskInfo;
}

export const taskInfo = configTaskInfo();

export const initConfig = async () => {
  const queryString = new URL(window.location).search;
  const urlParams = new URLSearchParams(queryString);
  const pid = urlParams.get('participant') || null;
  const studyId = urlParams.get('studyId') || null;
  const classId = urlParams.get('classId') || null;
  const schoolId = urlParams.get('schoolId') || null;

  const config = {
    pid: pid,
    studyId: studyId,
    classId: classId,
    schoolId: schoolId,
    // TODO: You can add additional user metadata here
    userMetadata: {},
    startTime: new Date(),
    urlParams: urlParams,
    firekit: null,
  };

  // If the participant's ID was supplied through the query string, then start the
  // run using their info
  if (config.pid !== null) {
    const userInfo = {
      id: config.pid,
      studyId: config.sessionId || null,
      classId: config.classId || null,
      schoolId: config.schoolId || null,
      userMetadata: config.userMetadata,
    };

    config.firekit = new RoarFirekit({
      config: roarConfig,
      userInfo: userInfo,
      taskInfo,
    });

    await config.firekit.startRun();
  }

  return config;
};

const initRoarJsPsych = (config) => {
  // ROAR apps communicate with the participant dashboard by passing parameters
  // through the URL. The dashboard can be made to append a "pipeline" parameter
  // e.g., https://{{kebab name}}.web.app?pipeline=rc for the REDCap pipeline.
  // Similarly, at the end of the assessment the ROAR app communicates with the
  // dashboard using URL parameters for a game token, "g", and a completion
  // status, "c", e.g., https://reading.stanford.edu/?g=1234&c=1.  Here we inspect
  // the "pipeline" parameter that was passed through the URL query string and
  // construct the appropriate redirect URL.
  const queryString = new URL(window.location).search;
  const urlParams = new URLSearchParams(queryString);
  const pipeline = urlParams.get('pipeline') || null;

  // TODO: Customize the redirect URLs here by inserting the correct game token.
  const redirect = () => {
    // TODO: Replace the pipeline value here with one that you want
    if (pipeline === 'insert-pipeline-value-1-here') {
      // TODO: Fix the redirect URL here by replacing the 'XXXX' in the URL below
      window.location.href = 'https://reading.stanford.edu/?g=XXXX&c=1';
      // TODO: Replace the pipeline value here with one that you want
    } else if (pipeline === 'insert-pipeline-value-2-here') {
      // TODO: Fix the redirect URL here by replacing the 'XXXX' in the URL below
      window.location.href = 'https://reading.stanford.edu/?g=XXXX&c=1';
      // TODO: Replace the pipeline value here with one that you want
    } else if (pipeline === 'insert-pipeline-value-4-here') {
      // Here, we refresh the page rather than redirecting back to the dashboard
      window.location.reload();
    }
    // You can add additional pipeline-dependent redirect URLs here using
    // additional `else if` clauses.
  };

  const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: 'Progress Complete',
    on_finish: () => {
      redirect();
    },
  });

  // Extend jsPsych's on_finish and on_data_update lifecycle functions to mark the
  // run as completed and write data to Firestore, respectively.
  const extend = (fn, code) =>
    function () {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(fn, arguments);
      // eslint-disable-next-line prefer-rest-params
      code.apply(fn, arguments);
    };

  jsPsych.opts.on_finish = extend(jsPsych.opts.on_finish, () => {
    config.firekit.finishRun();
  });

  jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, (data) => {
    if (['test_response', 'practice_response'].includes(data.task)) {
      config.firekit?.writeTrial(data);
    }
  });

  // Add a special error handler that writes javascript errors to a special trial
  // type in the Firestore database
  window.addEventListener('error', (e) => {
    const { msg, url, lineNo, columnNo, error } = e;

    config.firekit?.writeTrial({
      task: 'error',
      lastTrial: jsPsych.data.getLastTrialData().trials[0],
      message: String(msg),
      source: url || null,
      lineNo: String(lineNo || null),
      colNo: String(columnNo || null),
      error: JSON.stringify(error || null),
    });
  });

  return jsPsych;
};

export const initRoarTimeline = (config) => {
  // If the participant's ID was **not** supplied through the query string, then
  // ask the user to fill out a form with their ID, class and school.
  const getPid = {
    type: jsPsychSurveyText,
    questions: [
      {
        prompt: 'Participant ID:',
        name: 'pid',
        placeholder: '0000',
        required: true,
      },
      {
        prompt: 'Class ID:',
        name: 'ClassId',
        placeholder: '0000',
        required: true,
      },
      {
        prompt: 'School ID',
        name: 'SchoolId',
        placeholder: '0000',
        required: true,
      },
    ],
    on_finish: (data) => {
      // eslint-disable-next-line no-param-reassign
      config.pid = data.response.pid;
      // eslint-disable-next-line no-param-reassign
      config.classId = data.response.ClassId;
      // eslint-disable-next-line no-param-reassign
      config.schoolId = data.response.SchoolId;
    },
  };

  const ifGetPid = {
    timeline: [getPid],
    conditional_function: function () {
      return config.pid === null;
    },
    on_timeline_finish: async () => {
      const userInfo = {
        id: [config.schoolId, config.classId, config.pid].join('-'),
        studyId: config.sessionId,
        classId: config.classId || null,
        schoolId: config.schoolId || null,
        userMetadata: config.userMetadata,
      };

      // eslint-disable-next-line no-param-reassign
      config.firekit = new RoarFirekit({
        config: roarConfig,
        userInfo: userInfo,
        taskInfo,
      });

      await config.firekit.startRun();
    },
  };

  // Enter full screen mode
  const enterFullscreen = {
    type: jsPsychFullScreen,
    fullscreen_mode: true,
    message: `<div><h1>The experiment will switch to full screen mode. <br> Click the button to continue. </h1></div>`,
  };

  return [ifGetPid, enterFullscreen];
};

/* csv helper function */
export const readCSV = (url) =>
  new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        const csv_stimuli = results.data;
        resolve(csv_stimuli);
      },
    });
  });

