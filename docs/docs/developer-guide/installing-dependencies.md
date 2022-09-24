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

    <script id="asciicast-qsy1XVyK5gJjI5v5TrcDDgydj" src="https://asciinema.org/a/qsy1XVyK5gJjI5v5TrcDDgydj.js" async></script>

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
