// jsPsych imports
import { initJsPsych } from 'jspsych';
import jsPsychFullScreen from '@jspsych/plugin-fullscreen';
import jsPsychSurveyText from '@jspsych/plugin-survey-text';
import Papa from 'papaparse';

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

// TODO Shoaib: Move this to roar-utils and import here
export const initRoarJsPsych = (roarAppFirekit) => {
  const jsPsych = initJsPsych({
    show_progress_bar: true,
    auto_update_progress_bar: false,
    message_progress_bar: 'Progress Complete',
    on_finish: () => {
      // TODO Adam: Add redirect callback to roarAppFirekit's finishRun method.
      roarAppFirekit.finishRun();
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

  const startTime = new Date();

  const timingData = {
    start_time_utc0: startTime.toISOString(),
    start_time_unix: startTime.getTime(),
    start_time_local: startTime.toLocaleString(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, (data) => {
    if (data.save_trial) {
      firekit.writeTrial({
        timingData,
        userInfo: firekit.userInfo,
        ...data,
      });
    }
  });

  // Add a special error handler that writes javascript errors to a special trial
  // type in the Firestore database
  // TODO Adam: Don't write these as trials. Instead add a logError method to roarAppFirekit
  window.addEventListener('error', (e) => {
    const { msg, url, lineNo, columnNo, error } = e;

    firekit.writeTrial({
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

// TODO (Shoaib): Move this to roar-utils
// TODO (Shoaib): Write docstring telling users the format of the questions parameter
// e.g.[
//       {
//         prompt: 'Participant ID:',
//         name: 'pid',
//         placeholder: '0000',
//         required: true,
//       },
//       {
//         prompt: 'Class ID:',
//         name: 'ClassId',
//         placeholder: '0000',
//         required: true,
//       },
//       {
//         prompt: 'School ID',
//         name: 'SchoolId',
//         placeholder: '0000',
//         required: true,
//       },
// ]
export const initRoarTimeline = (roarAppFirekit, isAnonymous = false, questions) => {
  const timeline = [];

  const startRun = {
    type: jsPsychCallFunction,
    func: roarAppFirekit.startRun,
  };
  timeline.push(startRun);

  if (isAnonymous) {
    const anonMetadataSurvey = {
      type: jsPsychSurveyText,
      questions: questions,
      on_finish: (data) => {
        // TODO: Add an updateUserDoc method to RoarAppFirekit
        roarAppFirekit.updateUserDoc(data.response);
      },
    };
    timeline.push(anonMetadataSurvey);
  }

  // Enter full screen mode
  const enterFullscreen = {
    type: jsPsychFullScreen,
    fullscreen_mode: true,
    message: `<div><h1>The experiment will switch to full screen mode. <br> Click the button to continue. </h1></div>`,
  };
  timeline.push(enterFullscreen);

  return timeline;
};

/* csv helper function */
// TODO Shoaib: Move this to roar-utils
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
