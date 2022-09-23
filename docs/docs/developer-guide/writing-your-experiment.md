# Writing your experiment

Finally, let's stimulate our participant!

---

## Starting the development server

Your ROAR app is ready to go out of the box. Let's start the development server to see what the experiment looks like in the browser.

=== "screencast"

    <script id="asciicast-3BzroQXKrkJwROlvZPYSF3K8s" src="https://asciinema.org/a/3BzroQXKrkJwROlvZPYSF3K8s.js" async></script>

=== "code only"

    ```sh
    npm start
    ```

This will automatically open a new browser tab with your experiment. It should look something like the [experiment hosted here](https://create-roar-app-example.web.app/){target=_blank}:

[![A screenshot of the 2AFC ROAR template experiment](../assets/hdnhd-template-screenshot.png)](https://create-roar-app-example.web.app/){target=_blank}

However, you're experiment will automatically update when you make changes to your source code.

## Adding another block of stimuli

In [Configuration](configuration.md), we described a two-block structure for our new experiment. Let's implement that structure now by first adding images of cats and dogs and then editing the experiment's source code to include those new images.

### Adding more images

The first step in creating our new block is hosting the images of dogs and cats that we will use as stimuli. Download these images to your computer

- [cat.zip](../assets/block-2-images/cat.zip)
- [dog.zip](../assets/block-2-images/dog.zip)

We will demonstrate two different ways to host images: we'll host the cat images along side your experiment and the dog images in a public google cloud storage bucket.

#### Hosting images alongside your experiment

=== "screencast"

    <script id="asciicast-mcEQabC4s6YIvnr1fYz6XdILP" src="https://asciinema.org/a/mcEQabC4s6YIvnr1fYz6XdILP.js" async></script>

=== "code only"

    First download the [cat images zip file](../assets/block-2-images/cat.zip). Assuming that this file was downloaded to `~/Downloads`, do

    ```sh
    # Make a folder for the cat images
    mkdir -p src/assets
    # Navigate to that folder
    cd src/assets
    # Move the downloaded zip file to this folder
    mv ~/Downloads/cat.zip .
    # Unzip the file
    unzip cat.zip
    # And delete the zip file
    rm cat.zip
    cd ../..
    ```

    Now edit the `src/loadAssets.js` file to load these new cat images. You can add individual files simply by importing them as variables and then referencing them in your code. For example

    ```js
    // This is the same jsPsych preload plugin from before
    import jsPsychPreload from '@jspsych/plugin-preload';

    // Import individual cat image files
    import cat1 from './assets/cat/1.jpg';
    import cat2 from './assets/cat/2.jpg';
    import cat3 from './assets/cat/3.jpg';
    import cat4 from './assets/cat/4.jpg';
    import cat5 from './assets/cat/5.jpg';

    // Reference these files in a new array
    const catImages = [cat1, cat2, cat3, cat4, cat5];

    // Preload the cat image
    export const preloadCatImages = {
      type: jsPsychPreload,
      images: catImages,
    }
    ```

    And don't forget to commit your changes into git.

    ```sh
    git add src/assets/cat
    git add -u
    git commit -m "Add cat images for block 2"
    ```

#### Hosting images using a cloud storage provider

The above method of hosting image assets alongside your experiment is fine if you only have a few files. But it can become cumbersome to import each file separately if you have a lot of assets. Rather than hosting your files with your website, you can upload them to a cloud storage provider and access your files using a URL. To demonstrate, we have already uploaded the dog images to a Google Cloud Storage bucket. In fact, it is the same bucket that already hosts the hot dog vs. not hot dog images. You can see the images here
([1](https://storage.googleapis.com/roar-hot-dog-images/dog/1.jpg){target=_blank},
[2](https://storage.googleapis.com/roar-hot-dog-images/dog/2.jpg){target=_blank},
[3](https://storage.googleapis.com/roar-hot-dog-images/dog/3.jpg){target=_blank},
[4](https://storage.googleapis.com/roar-hot-dog-images/dog/4.jpg){target=_blank},
[5](https://storage.googleapis.com/roar-hot-dog-images/dog/5.jpg){target=_blank}).

Two popular cloud storage service providers are Google Cloud Storage (GCS) and Amazon Simple Storage Service (S3). To upload your own images and make them publicly available, follow these instructions:

- Create a storage bucket ([GCS instructions](https://cloud.google.com/storage/docs/creating-buckets), [S3 instructions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/create-bucket-overview.html))
- Upload objects to the bucket ([GCS instructions](https://cloud.google.com/storage/docs/uploading-objects), [S3 instructions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/upload-objects.html))
- Make the data public ([GCS instructions](https://cloud.google.com/storage/docs/access-control/making-data-public), [S3 instructions](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteAccessPermissionsReqd.html))

Then we can add references to the dog image URLs like so

=== "screencast"

    <script id="asciicast-CilcYmBcElKbDsCpNLZiK4i5T" src="https://asciinema.org/a/CilcYmBcElKbDsCpNLZiK4i5T.js" async></script>

=== "code only"

    Edit the `src/loadAssets.js` file to include the dog image URLs

    ```js
    const dogImages = Array.from(Array(numFiles), (_, i) => i + 1).map(
      (idx) => `https://storage.googleapis.com/roar-hot-dog-images/dog/${idx}.jpg`,
    );

    const block2Files = catImages.concat(dogImages);
    export const block2Targets = block2Files.map((url) => ({
      target: `<img src="${url}" width=250>`,
      isDog: url.includes('dog'),
    }));
    ```

    We'll use the `block2Targets` array in the next section. Finally, edit the `preloadCatImages` object at the end of the file to preload all of the cat vs. dog images:

    ```js
    // Preload the block 2 images
    export const preloadBlock2Images = {
      type: jsPsychPreload,
      images: block2Files,
    };
    ```

??? info "Making sense of the above javascript"

    If the above line of javascript for `dogImages` doesn't make sense to you, let's break it down into its components:
    
    ```js
    Array(numFiles)
    // Yields [ <5 empty items> ] since numFiles = 5

    Array.from(Array(numFiles), (_, i) => i + 1)
    // Yields [ 1, 2, 3, 4, 5 ]

    // And Finally
    Array.from(Array(numFiles), (_, i) => i + 1).map(
      (idx) => `https://storage.googleapis.com/roar-hot-dog-images/dog/${idx}.jpg`,
    );
    // Yields
    // [
    //   'https://storage.googleapis.com/roar-hot-dog-images/dog/1.jpg',
    //   'https://storage.googleapis.com/roar-hot-dog-images/dog/2.jpg',
    //   'https://storage.googleapis.com/roar-hot-dog-images/dog/3.jpg',
    //   'https://storage.googleapis.com/roar-hot-dog-images/dog/4.jpg',
    //   'https://storage.googleapis.com/roar-hot-dog-images/dog/5.jpg'
    // ]
    ```

    By using the [map method](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), we were able to write the URL pattern just once, following the [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself). We use the map method again to convert the raw URLs in the `dogImages` array to HTML image tags in the `block2Targets` array.

### Adding a block of stimuli to `index.js`

Now that we have established references to our new cat vs. dog images, let's create the new block of stimuli. We'll introduce this first by adding only one single stimulus. and then we'll use the same code to add an entire block of stimuli using jsPsych's timeline variables.

#### Adding a single stimulus

We will add the first stimulus in the `block2Targets` array.

=== "screencast"

    <script id="asciicast-Fae6hjgPoGTYK98ISwIyYZ5nQ" src="https://asciinema.org/a/Fae6hjgPoGTYK98ISwIyYZ5nQ.js" async></script>

=== "code only"

    Edit the `src/index.js` file to include a new instruction set and the new stimuli.

    At the top of the file, add the following imports

    ```js
    import { block2Targets, preloadBlock2Images } from './loadAssets';
    ```
    
    Then, after the line that reads

    ```js
    timeline.push(hotDogTrials);
    ```

    place the following code

    ```js
    const block2Instructions = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: `
        <h3>Great Job!</h3>
        <p>
          Now press the right arrow key if the displayed image is of a dog.
          Press the left arrow key if the displayed image is of a cat.
        </p>
        <p>Press any key to continue.</p>
        `,
    };

    timeline.push(preloadBlock2Images);
    timeline.push(block2Instructions);

    const catVsDogTrials = {
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `<div style="font-size: 60px;">+</div>`,
          choices: 'NO_KEYS',
          trial_duration: 500,
        },
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: block2Targets[0],
          choices: ['ArrowLeft', 'ArrowRight'],
          prompt: `
            <p>Is this a cat or a dog?</p>
            <p>If cat, press the left arrow key.</p>
            <p>If dog, press the right arrow key.</p>
            `
          data: {
            // Here is where we specify that this trial is a test response trial
            task: 'test_response',
            // Here we can also specify additional information that we would like stored
            // in this trial in ROAR's Firestore database. For example,
            start_time: config.startTime.toLocaleString('PST'),
            start_time_unix: config.startTime.getTime(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        }
      ]
    };

    timeline.push(catVsDogTrials);
    ```

#### Adding a block of stimuli

We just added one single stimulus. It would be really annoying to have to write all that code over and over just to add the next nine stimuli for this block. Luckily, jsPsych has [timeline variables](https://www.jspsych.org/7.0/overview/timeline/#timeline-variables){target=_blank} to make this easier. In fact, the hot dog vs. not hot dog block already uses this technology. Let's add the other dog vs. cat stimuli using timeline variables with random sampling.

=== "screencast"

    <script id="asciicast-KF7ujphUxiYlH08yXYcPx6Y3F" src="https://asciinema.org/a/KF7ujphUxiYlH08yXYcPx6Y3F.js" async></script>

=== "code only"

    Edit the `catVsDogTrials` in the `src/index.js` file so that it reads:

    ```js
    const catVsDogTrials = {
      timeline: [
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: `<div style="font-size: 60px;">+</div>`,
          choices: 'NO_KEYS',
          trial_duration: 500,
        },
        {
          type: jsPsychHtmlKeyboardResponse,
          stimulus: jsPsych.timelineVariable('target'),
          choices: ['ArrowLeft', 'ArrowRight'],
          prompt: `
            <p>Is this a cat or a dog?</p>
            <p>If cat, press the left arrow key.</p>
            <p>If dog, press the right arrow key.</p>
            `
          data: {
            // Here is where we specify that this trial is a test response trial
            task: 'test_response',
            // Here we can also specify additional information that we would like stored
            // in this trial in ROAR's Firestore database. For example,
            start_time: config.startTime.toLocaleString('PST'),
            start_time_unix: config.startTime.getTime(),
            timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          }
        }
      ],
      timeline_variables: block2Targets,
      sample: {
        type: 'without-replacement',
        size: 10,
      },
    };
    ```

### Ending the experiment

We've added the second block of stimuli. Right now, the experiment abruptly ends after the last stimulus. It's a good idea to let your participants know that they've finished the experiment. Let's add one last trial telling the participant that they are done.

=== "screencast"

    <script id="asciicast-npcPshy7MAWkNTQDOUEFHXHVe" src="https://asciinema.org/a/npcPshy7MAWkNTQDOUEFHXHVe.js" async></script>

=== "code only"

    Add one more trial and push it to the timeline before the `exit_fullscreen` trial.

    ```js
    const endTrial = {
      type: jsPsychHtmlKeyboardResponse,
      stimulus: '<p>Great job! Press any key to finish the assessment.</p>',
      choices: 'ALL_KEYS',
      response_ends_trial: true,
    };

    timeline.push(endTrial);
    ```

!!! warning "How to properly end your assessment"

    Be sure to give your participant concrete instructions for how to end the assessment. In this case, we told them to "press any key to finish the assessment." If you don't, then the participant might think that they are done and simply close the browser tab. Why is this bad? Although all of the trial information will be saved in the database, the assessment will not be counted as finished (either in the database or in the participant dashboard) because the jsPsych timeline did not complete.

    If you want to use any of jsPsych's audio plugins (e.g., [audio-button-response](https://www.jspsych.org/7.0/plugins/audio-button-response/) or [audio-keyboard-response](https://www.jspsych.org/7.0/plugins/audio-keyboard-response/)) to end the assessment
    be sure to specify `trial_ends_after_audio: true` so that the experiment automatically ends after the last audio file is played.
    Likewise, if you want to use any video plugins (e.g., [video-button-response](https://www.jspsych.org/7.0/plugins/video-button-response/) or
    [video-keyboard-response](https://www.jspsych.org/7.0/plugins/video-keyboard-response/)), be sure to specify `trial_ends_after_video: true` so that the experiment automatically ends after the last video.

    The guiding principle here is to ensure that the jsPsych timeline ends before the participant closes their browser tab.

## Advice for asset files

ROAR experiments can often include a lot of asset files, such as images, audio, and video.

- Advice for asset files
  - audio
  - image
  - video
