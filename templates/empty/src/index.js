/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

// jsPsych imports
import jsPsychFullScreen from "@jspsych/plugin-fullscreen";
import surveyText from '@jspsych/plugin-survey-text';

// Import necessary for async in the top level of the experiment script
import "regenerator-runtime/runtime";

// Firebase imports
import { RoarFirekit } from "@bdelab/roar-firekit";
import { roarConfig } from "./firebaseConfig";

// Local modules
import {
  jsPsych,
  config,
  taskInfo,
} from "./config";

// CSS imports
import "./css/roar.css";

let firekit;
const timeline = [];

if (config.pid !== null) {
  const userInfo = {
    id: config.pid,
    studyId: config.sessionId || null,
    classId: config.classId || null,
    schoolId: config.schoolId || null,
    userMetadata: config.userMetadata,
  };

  firekit = new RoarFirekit({
    config: roarConfig,
    userInfo: userInfo,
    taskInfo,
  });

  await firekit.startRun();
}

const getPid = {
  type: surveyText,
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
    config.pid = data.response.pid;
    config.classId = data.response.ClassId;
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
      id: [config.schoolId, config.classId, config.pid].join("-"),
      studyId: config.sessionId,
      classId: config.classId || null,
      schoolId: config.schoolId || null,
      userMetadata: config.userMetadata,
    };

    firekit = new RoarFirekit({
      config: roarConfig,
      userInfo: userInfo,
      taskInfo,
    });

    await firekit.startRun();
  },
};

timeline.push(ifGetPid);

const enter_fullscreen = {
  type: jsPsychFullScreen,
  fullscreen_mode: true,
  message: `<div><h1>The experiment will switch to full screen mode. <br> Click the button to continue. </h1></div>`,
};

const extend = (fn, code) =>
  function () {
    // eslint-disable-next-line prefer-rest-params
    fn.apply(fn, arguments);
    // eslint-disable-next-line prefer-rest-params
    code.apply(fn, arguments);
  };

jsPsych.opts.on_finish = extend(jsPsych.opts.on_finish, () => {
  firekit.finishRun();
});

// Next we extend the data update function to write each trial to the Firestore
// database. Note that we only write to the database if the trial's data.task
// is "test_response" or "practice_response." Therefore, it is VERY IMPORTANT
// that you append either of those tasks to the data for each trial that you
// want to store in ROAR's Firestore database.
jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, (data) => {
  if (["test_response", "practice_response"].includes(data.task)) {
    firekit?.writeTrial(data);
  }
});

timeline.push(enter_fullscreen);

// TODO: Add your stimuli here
// TODO: IMPORTANT: add task information to the trial so that it gets recorded
// in ROAR's Firestore database.
// For example:
const trial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '<p style="font-size:48px; color:green;">BLUE</p>',
  choices: ['r', 'g', 'b'],
  prompt: "<p>Is the ink color (r)ed, (g)reen, or (b)lue?</p>",
  data: {
    // Here is where we specify that this trial is a test response trial
    task: "test_response",
    // Here we can also specify additional information that we would like stored
    // in this trial in ROAR's Firestore database. For example,
    start_time: config.startTime.toLocaleString("PST"),
    start_time_unix: config.startTime.getTime(),
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  }
};

timeline.push(trial);

const exit_fullscreen = {
  type: jsPsychFullScreen,
  fullscreen_mode: false,
  delay_after: 0,
};

timeline.push(exit_fullscreen);

// Add a special error handler that writes javascript errors to a special trial
// type in the Firestore database
window.onerror = function (msg, url, lineNo, columnNo, error) {
  firekit?.writeTrial({
    task: 'error',
    lastTrial: jsPsych.data.getLastTrialData().trials[0],
    message: String(msg),
    source: url || null,
    lineNo: String(lineNo || null),
    colNo: String(columnNo || null),
    error: JSON.stringify(error || null),
  });
  return false;
};

jsPsych.run(timeline);
