// jsPsych imports
import { initJsPsych } from 'jspsych';
import jsPsychFullScreen from '@jspsych/plugin-fullscreen';
import jsPsychSurveyText from '@jspsych/plugin-survey-text';
import Papa from 'papaparse';

// Firebase imports
import { RoarFirekit } from '@bdelab/roar-firekit';
import { roarConfig } from './firebaseConfig';

function configTaskInfo() {
  const taskInfo = {
    taskId: '{{kebab name}}',
    taskName: '{{capital name space=true}}',
    variantName: '{{kebab variant}}',
    taskDescription: '{{description}}',
    variantDescription: '{{variantDescription}}',
    // eslint-disable-next-line no-undef
    srcHash: SRC_HASH,
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
    // TODO (optional): You can add additional user metadata here
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
      studyId: config.studyId || null,
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

export const initRoarJsPsych = (config) => {
  // ROAR apps communicate with the participant dashboard by passing parameters
  // through the URL. The dashboard can be made to append a "gameId"
  // parameter, e.g., https://{{kebab name}}.web.app?gameId=1234.
  // Similarly, at the end of the assessment the ROAR app communicates with the
  // dashboard to let it know that the participant has finished the assessment.
  // The dashboard expects a game token, "g", and a completion
  // status, "c", e.g., https://reading.stanford.edu/?g=1234&c=1. Here we inspect
  // the "gameId" parameter that was passed through the URL query string and
  // construct the appropriate redirect URL.
  const queryString = new URL(window.location).search;
  const urlParams = new URLSearchParams(queryString);
  const gameId = urlParams.get('gameId') || null;

  const redirect = () => {
    if (gameId === null) {
      // If no game token was passed, we refresh the page rather than
      // redirecting back to the dashboard
      window.location.reload();
    } else {
      // Else, redirect back to the dashboard with the game token that
      // was originally provided
      window.location.href = `https://reading.stanford.edu/?g=${gameId}&c=1`;
    }
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

  const timingData = {
    start_time_utc0: config.startTime.toISOString(),
    start_time_unix: config.startTime.getTime(),
    start_time_local: config.startTime.toLocaleString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, (data) => {
    if (data.save_trial) {
      config.firekit?.writeTrial({
        timingData,
        userInfo: config.firekit?.userInfo,
        ...data,
      });
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
      timeStamp: new Date().toISOString(),
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
        studyId: config.studyId || null,
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
