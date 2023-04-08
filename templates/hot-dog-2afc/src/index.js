// jsPsych imports
import jsPsychFullScreen from '@jspsych/plugin-fullscreen';
import jsPsychHtmlKeyboardResponse from '@jspsych/plugin-html-keyboard-response';

// Import necessary for async in the top level of the experiment script
import 'regenerator-runtime/runtime';

// CSS imports
import './css/roar.css';

// Local modules
// TODO Shoaib, these should be moved to roar-utils and imported from there.
import { initRoarJsPsych, initRoarTimeline } from './config';

import { allTargets, preloadImages } from './loadAssets';

// TODO: Put this class in roar-utils, import it and then extend it using the input name from create-roar-app
class RoarApp {
  constructor(roarAppFirekit) {
    this.firekit = roarAppFirekit;
    this.timeline = initRoarTimeline(this.roarAppFirekit);
    this.jsPsych = initRoarJsPsych(this.roarAppFirekit);
  }

  run() {
    this.jsPsych.run(this.timeline);
  }
}

// ---------Preload Media Here---------
const timeline = [];
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

// TODO: Figure out how to disable prettier complaints about this template string
export class {{capital name}} extends RoarApp {
  constructor(roarAppFirekit) {
    super(roarAppFirekit);
    this._timeline.push(timeline);
  }
}
