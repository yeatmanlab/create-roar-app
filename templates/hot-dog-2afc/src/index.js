/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */

// jsPsych imports
import jsPsychFullScreen from "@jspsych/plugin-fullscreen";
import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";
import jsPsychSurveyText from '@jspsych/plugin-survey-text';

// Import necessary for async in the top level of the experiment script
import "regenerator-runtime/runtime";

// Firebase imports
import { RoarFirekit } from "@bdelab/roar-firekit";
import { roarConfig } from "./firebaseConfig";
import { allTargets, preloadImages } from "./loadAssets";

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

jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, (data) => {
  if (["test_response", "practice_response"].includes(data.task)) {
    firekit?.writeTrial(data);
  }
});

timeline.push(enter_fullscreen);

timeline.push(preloadImages);

//---------Create trials---------
/* define welcome message trial */
const welcome = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <h3>Directions</h3>
    <p>
      Press the right arrow key if the displayed image is a hot dog.
      Press the left arrow key otherwise.
    </p>
    <p>Press any key to continue</p>
    `
};
timeline.push(welcome);

const hotDogTrials = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: "NO_KEYS",
      trial_duration: 500,
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable('target'),
      choices: ["ArrowLeft", "ArrowRight"],
      prompt: `
        <p>Is this a hot dog?</p>
        <p>If yes, press the right arrow key.</p>
        <p>If no, press the left arrow key.</p>
      `,
      data: {
        // Here is where we specify that this trial is a test response trial
        task: "test_response",
        // Here we can also specify additional information that we would like stored
        // in this trial in ROAR's Firestore database. For example,
        start_time: config.startTime.toLocaleString("PST"),
        start_time_unix: config.startTime.getTime(),
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }
    },
  ],
  timeline_variables: allTargets,
  sample: {
    type: "without-replacement",
    size: 10,
  },
};

timeline.push(hotDogTrials);

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
