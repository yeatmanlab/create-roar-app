# Mobile-friendly audio

Special instructions for presenting audio stimuli

---

In the previous sections of this guide, we used jsPsych's [html-keyboard-response](https://www.jspsych.org/7.0/plugins/html-keyboard-response/) and [image-keyboard-response](https://www.jspsych.org/7.0/plugins/image-keyboard-response/) plugins. If you have video stimuli, you could also use the [video-keyboard-response plugin](https://www.jspsych.org/7.0/plugins/video-keyboard-response/). Each of these plugins will work seemlessly on mobile and desktop web browsers. But if you're experiment involves audio stimuli, you will need to do a little bit of hacking to run your app on a mobile browser. In this section, we'll introduce the technique we've used to auto-play audio stimuli on mobile browsers.

??? info "Expand this to learn about other response modalities"

    All of the plugins listed above end in "keyboard-response." jsPsych also allows other response modalities, like

    - button response: [html-button-response](https://www.jspsych.org/7.0/plugins/html-button-response/), [image-button-response](https://www.jspsych.org/7.0/plugins/image-button-response/), [video-button-response](https://www.jspsych.org/7.0/plugins/video-button-response/)
    - swipe response: [html-swipe-response](https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-html-swipe-response/README.md), [image-swipe-response](https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-image-swipe-response/README.md)
    - multi response (a combination of keyboard and button responses): [html-multi-response](https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-html-multi-response/README.md), [image-multi-response](https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-image-multi-response/README.md), [video-multi-response](https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-video-multi-response/README.md)

    And there are many more. Browse the [list of official jsPsych plugins](https://www.jspsych.org/7.0/plugins/list-of-plugins/) and the list of [community contributed plugins](https://github.com/jspsych/jspsych-contrib).

## What is the problem with audio stimuli on iOS

In most cases, playing audio files requires the use of the [`<audio>` HTML tag](https://www.w3schools.com/tags/tag_audio.asp) or the [JavaScript `Audio()` constuctor](https://developer.mozilla.org/en-US/docs/Web/API/HTMLAudioElement/Audio). jsPsych's audio stimulus plugins use these things under the hood. This works on desktop browsers but we want ROAR apps to be responsive to mobile platforms as well. On iOS platforms, autoplay is disabled. Instead, iOS requires that play be initiated as part of a user interaction (e.g., the user clicks a button). There's a bit of documentation about this on [Apple's developer documentation](https://developer.apple.com/library/archive/documentation/AudioVideo/Conceptual/Using_HTML5_Audio_Video/Device-SpecificConsiderations/Device-SpecificConsiderations.html#//apple_ref/doc/uid/TP40009523-CH5-SW1). Practically speaking, this means that jsPsych's audio stimulus plugins, which autoplay audio immediately after a trial is loaded, will not work on iOS.

## What is the recommended solution

We can play audio using Javascript's `Audio()` constructor if we first ask the participant to click on a button. Moreover, once the participant clicks on a button the first time, we can preserve the original `Audio()` instance, change its `src` attribute to any other audio file, and call its `play()` method without any further user interaction. We'll step through this process below.

1. Hijack the enter-fullscreen button to play audio

    First we import the necessary files and setup our ROAR timeline as before. Then we import an inoffensive click sound ([click.mp3](../assets/click.mp3){target=_blank}) and create a global audio object (appropriately named `globalAudio`) to play this click sound. Lastly we add a fullscreen trial to the timeline and attach an `onclick` event to the fullscreen button to play the click sound. Here we use an [event-related callback function](https://www.jspsych.org/6.3/overview/callbacks/index.html) to attach the `globalAudio`'s `play()` function to the fullscreen button's click event.

       ```js
       // Import jsPsych plugins as before
       import jsPsychFullScreen from "@jspsych/plugin-fullscreen";
       import jsPsychHtmlKeyboardResponse from "@jspsych/plugin-html-keyboard-response";

       // Import a click sound
       import clickSound from '../assets/click.mp3';

       // Import an audio stimulus (we will use this in the next step)
       import stimulusSound from '../assets/stimulus.mp3';

       // Import the ROAR setup functions as with the examples in the previous section.
       import {
         initConfig,
         initRoarJsPsych,
         initRoarTimeline,
       } from './config';  

       // Set up the config, jsPsych, and timeline just like before
       const config = await initConfig();
       const jsPsych = initRoarJsPsych(config);
       const timeline = initRoarTimeline(config); 

       // Here, create a global Audio object that will "auto-play" audio files
       const globalAudio = new Audio(clickSound);

       // Use the standard enterFullscreen plugin as before
       const enterFullscreen = {
         type: jsPsychFullScreen,
         fullscreen_mode: true,
         message: `<div><h1>The experiment will switch to full screen mode. <br> Click the button to continue. </h1></div>`,
         // But now we add an event related callback to play the click audio file once
         // the user clicks the fullscreen button
         on_load: () => {
           const btn = document.getElementById('jspsych-fullscreen-btn');
           btn.onclick = () => {
             globalAudio.play();
           }
         }
       };

       timeline.push(enterFullscreen);
       ```

2. Reuse the global audio object when we want to "auto-play" audio stimuli

    Okay, so we have just played an audio file in response to a user interaction, completely in compliance with the iOS developer constraints. In a sense, the user's initial button click on the fullscreen button has "authorized" the `globalAudio` object to play audio. Now we reuse the same `globalAudio` object to effectively auto-play new stimuli. Here we will use the `html-keyboard-response` plugin along with another event-related callback function to change the `src` attribute of the `globalAudio` object.

       ```js
       const audioStimulus = {
         type: jsPsychHtmlKeyboardResponse,
         // Once the trial loads, change the audio src to the desired
         // stimulus and play the sound.
         on_load: () => {
           globalAudio.src = stimulusSound,
           globalAudio.play();
         },
         stimulus: () => {
           return `<div>
             <p>This is the HTML that you would like to show on-screen while the audio stimulus plays.
           </div>`
         },
         // Arbitrary choices here. Replace with your own values.
         choices = ["a", "b", "c"],
         // Once the trial is finished, we pause the audio so that it doesn't
         // "play over" into the next trail.
         on_finish: () => {
           globalAudio.pause();
         },
       };

       timeline.push(audioStimulus);
       ```

Whew! Now we have audio stimuli that "auto-play" after a trial finishes loading.
