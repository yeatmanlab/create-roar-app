# Installing additional dependencies

Use external libraries to add functionality to your experiment

---

As you develop your ROAR app, you may discover that you need to incorporate additional functionality using external JavaScript libraries. To do so, you'll follow outline of this section: installing the new library, importing it at the top of some JavaScript file, and using it in your source code. As a pedagogical example, in this section, we will install, import, and use the [image-keyboard-response](https://www.jspsych.org/7.0/plugins/image-keyboard-response/) plugin.

In the [writing your experiment section](writing-your-experiment.md), you added a block to your experiment asking participants to differentiate between cat and dog images.
You may have noticed that we created the `block2Targets` array in `src/loadAssets.js` in order to pass an HTML string as a stimulus to the `jsPsychHtmlKeyboardResponse` plugin. But jsPsych already has its own `jsPsychImageKeyboardResponse` plugin that takes an image stimulus as input and obviates the need for creating the `block2Targets` array. In this section, we will install the `jsPsychImageKeyboardResponse` plugin and adapt your experiment to use it.

Before we start, be sure to commit your work so far into version control.

## Installing the new library

First, use either npm or yarn to install the new plugin

=== "screencast"

    <script id="asciicast-cSa4Vo1mzqXW1iBKcfIJAHoZD" src="https://asciinema.org/a/cSa4Vo1mzqXW1iBKcfIJAHoZD.js" async></script>

=== "code only"

    Use either npm or yarn to install the new package

    === "npm (recommended)"

        ```sh
        npm install @jspsych/plugin-image-keyboard-response
        ```

    === "yarn"

        ```sh
        yarn install @jspsych/plugin-image-button-response
        ```

    You can then verify that `@jspsych/plugin-image-keyboard-response` has added to the dependencies section of the `package.json` file.

## Importing and using the new library

Now we are ready to start using the new plugin.

=== "screencast"

    <script id="asciicast-yWci9Z9Axm360r6qOkt3oDNCv" src="https://asciinema.org/a/yWci9Z9Axm360r6qOkt3oDNCv.js" async></script>

=== "code only"

    First, remove the HTML image tag from the `allTargets` and `block2Targets` arrays in `src/loadAssets.js`:

    ```js
    export const allTargets = allFiles.map((url) => ({
      target: url,
      isHotDog: !url.includes('nothotdog'),
    }));
    ```

    and

    ```js
    export const block2Targets = block2Files.map((url) => ({
      target: url,
      isDog: url.includes('dog'),
    }));
    ```

    Next, change the plugin type in `src/index.js`:

    ```js
    import jsPsychImageKeyboardResponse from '@jspsych/plugin-image-keyboard-response';

    // Skipping a lot of code here

    const hotDogTrials = {
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: '<div style="font-size:60px;">+</div>',
          choices: 'NO_KEYS',
          trial_duration: 500,
        },
        {
          type: jsPsychImageKeyboardResponse,
          stimulus: jsPsych.timelineVariable('target'),
          choices: ['ArrowLeft', 'ArrowRight'],
          prompt: `
            <p>Is this a hot dog?</p>
            <p>If yes, press the right arrow key.</p>
            <p>If no, press the left arrow key.</p>
          `,
          stimulus_height: 250,
          stimulus_width: 250,
          data: {
            // Here is where we specify that this trial is a test response trial
            task: 'test_response',
            // Here we can also specify additional information that we would like stored
            // in this trial in ROAR's Firestore database. For example,
            start_time: config.startTime.toLocaleString('PST'),
            start_time_unix: config.startTime.getTime(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          },
        },
      ],
      timeline_variables: allTargets,
      sample: {
        type: 'without-replacement',
        size: 10,
      },
    };

    // And likewise for the other stimulu.
    ```
