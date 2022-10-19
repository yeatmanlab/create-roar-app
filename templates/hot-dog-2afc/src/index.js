// jsPsych imports
import jsPsychFullScreen from '@jspsych/plugin-fullscreen';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

// Import necessary for async in the top level of the experiment script
import 'regenerator-runtime/runtime';

// CSS imports
import './css/roar.css';

// Local modules
import { initConfig, initRoarJsPsych, initRoarTimeline } from './config';

import { allTargets, preloadImages } from './loadAssets';

// ---------Initialize the jsPsych object and the timeline---------
const config = await initConfig();
const jsPsych = initRoarJsPsych(config);
const timeline = initRoarTimeline(config);

// ---------Preload Media Here---------
timeline.push(preloadImages);

// ---------Create trials---------
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
    `,
};
timeline.push(welcome);

const hotDogTrials = {
  timeline: [
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<div style="font-size:60px;">+</div>',
      choices: 'NO_KEYS',
      trial_duration: 500,
    },
    {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: jsPsych.timelineVariable('target'),
      choices: ['ArrowLeft', 'ArrowRight'],
      prompt: `
        <p>Is this a hot dog?</p>
        <p>If yes, press the right arrow key.</p>
        <p>If no, press the left arrow key.</p>
      `,
      data: {
        // Here is where we specify that we should save the trial to Firestore
        save_trial: true,
        // Here we can also specify additional information that we would like stored
        // in this trial in ROAR's Firestore database.
      },
    },
  ],
  timeline_variables: allTargets,
  sample: {
    type: 'without-replacement',
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

jsPsych.run(timeline);
