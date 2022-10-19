# Configuration (under the hood)

Communicate with the Firestore database and the participant dashboard.

---

ROAR apps work in concert with the [participant dashboard](https://reading.stanford.edu/) and the Firestore database to collect participant information and store trial data, respectively.

The details of these interactions have been deliberately abstracted away from you and put "under the hood" in `src/config.js`. In this section, we will explain what you need to do to make your ROAR apps communicate with the dashboard and the database. We will also **optionally** dive deeper into `src/config.js` to gain an understanding of how this works.

## Communicate with the dashboard

<!-- markdownlint-disable MD034 -->
The participant dashboard provides a unified login experience and helps participants monitor their progress on multiple ROAR assessments.
The dashboard keeps track of ROAR apps by assigned each one a unique number called a "game token".
ROAR apps and the dashboard communicate with each other by passing parameters through the [URL's query string](https://en.wikipedia.org/wiki/Query_string).
Suppose that your app is hosted at the website https://my-roar-app.web.app. The dashboard can be made to append a "gameToken" parameter. For example, https://my-roar-app.web.app?gameToken=1234 for the assessment associated with the game token "1234".

You might be asking, "what does my ROAR app do with this information?"
Well, when your assessment is done, it usually redirects the participant back to the dashboard. It has to let the dashboard know somehow that the participant has completed the game. ROAR apps solve this problem using the same query string technology, passing URL parameters for a game token, "g", and a completion status, "c". For example, redirecting the user to https://reading.stanford.edu/?g=1234&c=1 would communicate to the dashboard that the participant has completed the game with game token 1234. If no game token URL parameter is given to a ROAR app, it's default behavior is to refresh the page after the assessment is done.

!!! note "What you need to do"

    When you register your ROAR app in the participant dashboard, you **must** append a "gameToken" URL parameter. The value of this parameter must match the game token that the dashboard uses for your assessment.

??? example "Implementation details"

    There are lines of JavaScript code in `config.js` that inspect the "gameToken" parameter of the URL query string and construct the appropriate redirect URL to communicate back with the dashboard. You **DO NOT** need to edit this code.

    ``` js title="src/config.js" linenums="80"
    const queryString = new URL(window.location).search;
    const urlParams = new URLSearchParams(queryString);
    const gameToken = urlParams.get('gameToken') || null;

    const redirect = () => {
      if (gameToken === null) {
        // If no game token was passed, we refresh the page rather than
        // redirecting back to the dashboard
        window.location.reload();
      } else {
        // Else, redirect back to the dashboard with the game token that
        // was originally provided
        window.location.href = `https://reading.stanford.edu/?g=${gameToken}&c=1`;
      }
    };
    ```

## Keep track of changes to your task

During the [installation phase](installation.md), you entered some details about your task. We stored this metadata inside of `src/config.js` and it will be written to the Firestore database whenever a participant takes your assessment.

This helps you keep track of which task your participant is taking. Furthermore, your ROAR app also keeps track of variations in your task by assigning a new variant every time you change your source code.

!!! note "What you need to do"

    Nothing!

??? example "Implementation details"

    There are lines of JavaScript code in `config.js` that insert your task metadata into an object that is later passed to the Firestore database.

    ``` js title="src/config.js" linenums="11"
    function configTaskInfo() {
      const taskInfo = {
        taskId: 'my-roar-app',
        taskName: 'My Roar App',
        variantName: 'default',
        taskDescription: 'An example ROAR app using the two-alternative forced choice template',
        variantDescription: 'default',
        // eslint-disable-next-line no-undef
        srcHash: SRC_HASH,
      };

      return taskInfo;
    }
    ```

    That `SRC_HASH` variable on line 19 contains a hash of your entire `src` directory. It is calculated in the `webpack.config.js` file and then inserted into your JavaScript files as a global variable every time you use `npm run build` or `npm start`.

    ``` js title="webpack.config.js" linenums="109" hl_lines="2-6 30"
    module.exports = async (env, args) => {
      const hashOptions = {
        folders: { exclude: ['.*', 'node_modules', 'test_coverage'] },
        files: { include: ['*.js', '*.json'] },
      };
      const srcHash = await hashElement('./src', hashOptions);

      const roarDbDoc = env.dbmode === 'production' ? 'production' : 'development';

      let merged;
      switch (args.mode) {
        case 'development':
          merged = merge(commonConfig, developmentConfig);
          break;
        case 'production':
          merged = merge(commonConfig, productionConfig);
          break;
        default:
          throw new Error('No matching configuration was found!');
      }

      return merge(
        merged,
        {
          plugins: [
            new HtmlWebpackPlugin({ title: 'My Roar App' }),
            new webpack.ids.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
            new webpack.DefinePlugin({
              ROAR_DB_DOC: JSON.stringify(roarDbDoc),
              SRC_HASH: JSON.stringify(srcHash),
            }),
          ],
        },
      );
    };
    ```

## Connect to the Firestore database

ROAR apps store each trial's data in a [Firestore database][firestoredatabase]. In order to communicate with Firebase, your app needs to know certain metadata about your Firebase project. If you are developing an app for the [Brain Development and Education Lab (BDELab)][bdelab], then you don't have to do anything because the correct metadata has already been filled in. If you're developing for another organization, you'll have to supply your [Firebase project configuration][firebaseprojectconfig] in the `src/firebaseConfig.js` file.

The BDELab's Firestore database has separate collections for development and production data. So while you are developing your app, any trial data that you produce is kept separate from the experimental data of our in-production apps. Once you are ready to deploy your experiment in production, you're data will be stored in the production part of the database. By default, the development data will be stored in "[:material-home: :fontawesome-solid-chevron-right: dev :fontawesome-solid-chevron-right: my-roar-app](https://console.firebase.google.com/project/gse-yeatmanlab/firestore/data/~2Fdev~2Fmy-roar-app)", where the last element of that path will depend on the name that you gave to your ROAR app during installation. When deployed, your assessment data will be stored in "[:material-home: :fontawesome-solid-chevron-right: prod :fontawesome-solid-chevron-right: roar-prod](https://console.firebase.google.com/project/gse-yeatmanlab/firestore/data/~2Fprod~2Froar-prod)."

!!! note "What you need to do"

    If you are storing your data in your own Firestore database, supply your [Firebase project configuration][firebaseprojectconfig] in the `src/firebaseConfig.js` file. If you are developing for the BDELab, this step isn't necessary.

    To switch between the production and development portions of the database, use the `:prod` and `:dev` versions of the `npm run` commands. For example, `npm run build:dev` will build your app in the `dist` folder and configure it to store data in the development portion of the database. Conversely, `npm run build:prod` will configure it to write to the production portion of the database. There are similar sub-commands for `npm run start`.

    Lastly, if you type `npm start` or `npm run build` on their own without specifying `:prod` or `:dev`, the default behavior is to write to the development portion of the database.

??? example "Implementation details"

    The "scripts" portion of `package.json` contains the specialized `:prod` and `:dev` commands. Using `:prod` tells webpack to set the `dbmode` environment variable to "production", while using `:dev` sets that variable to "development."

    ``` js title="package.json" linenums="7" hl_lines="4 5 7 8"
      "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "build": "npx webpack --mode production",
        "build:dev": "npm run build -- --env dbmode=development",
        "build:prod": "npm run build -- --env dbmode=production",
        "start": "npx webpack serve --open --mode development",
        "start:dev": "npm run start -- --env dbmode=development",
        "start:prod": "npm run start -- --env dbmode=production"
      },
    ```

    ``` js title="webpack.config.js" linenums="109" hl_lines="8 29"
    module.exports = async (env, args) => {
      const hashOptions = {
        folders: { exclude: ['.*', 'node_modules', 'test_coverage'] },
        files: { include: ['*.js', '*.json'] },
      };
      const srcHash = await hashElement('./src', hashOptions);

      const roarDbDoc = env.dbmode === 'production' ? 'production' : 'development';

      let merged;
      switch (args.mode) {
        case 'development':
          merged = merge(commonConfig, developmentConfig);
          break;
        case 'production':
          merged = merge(commonConfig, productionConfig);
          break;
        default:
          throw new Error('No matching configuration was found!');
      }

      return merge(
        merged,
        {
          plugins: [
            new HtmlWebpackPlugin({ title: 'My Roar App' }),
            new webpack.ids.HashedModuleIdsPlugin(), // so that file hashes don't change unexpectedly
            new webpack.DefinePlugin({
              ROAR_DB_DOC: JSON.stringify(roarDbDoc),
              SRC_HASH: JSON.stringify(srcHash),
            }),
          ],
        },
      );
    };
    ```

    The `ROAR_DB_DOC` global variable is then used inside of `src/firebaseConfig.js` to set the root document in Firestore.

    ``` js title="src/firebaseConfig.js" linenums="3" hl_lines="4"
    // eslint-disable-next-line no-undef
    const prodDoc = 'your-org-name' === 'yeatmanlab' ? ['prod', 'roar-prod'] : ['external', 'your-org-name'];
    // eslint-disable-next-line no-undef
    const rootDoc = ROAR_DB_DOC === 'production' ? prodDoc : ['dev', 'my-roar-app'];
    ```

## Write trial data

Now that the ROAR app is connected to the Firestore database, you're going to want to write some trial data to it. To do so, you **MUST** append a single `#!js save_trial: true` field to the data collected by a jsPsych trial.

!!! note "What you need to do"

    You **MUST** add specific data to any trial you want to save to the Firestore database. [Here are instructions](https://www.jspsych.org/7.0/overview/data/#adding-data-to-a-particular-trial-or-set-of-trials) on how to add additional data to any jsPsych trial. In our case, we are required to add `#!js save_trial: true` to the trial data. For example,

    ```js hl_lines="5-8"
    const trialSavedToFirestore{
      type: jsPsychHtmlKeyboardResponse,
      stimulus: "Press y to save this trial to firestore"
      choices: ['y'],
      // Here is where we specify that we should save the trial to Firestore
      data: {
        save_trial: true,
      },
    },
    ```

    In the template that we are using in this developer's guide, you can see that this is already done in `src/index.js` on lines 56-61.

??? example "Implementation details"

    In `src/config.js`, we added [an event-related callback function](https://www.jspsych.org/7.0/overview/events/) to every single jsPsych trial. It gets called after the data gets updated and checks to see if the `save_trial` field is `true`. If so, it combines the trial data with some predefined timing and user data and writes it to the Firestore database using the [roar-firekit](https://richiehalford.org/roar-firekit/) library.

    ``` js title="src/config.js" linenums="125"
    jsPsych.opts.on_data_update = extend(jsPsych.opts.on_data_update, (data) => {
      if (data.save_trial) {
        config.firekit?.writeTrial({
          timingData,
          userInfo: config.firekit?.userInfo,
          ...data,
        });
      }
    });
    ```

[firestoredatabase]: https://firebase.google.com/docs/firestore
[bdelab]: https://www.brainandeducation.com/
[firebaseprojectconfig]: https://firebase.google.com/docs/web/learn-more#config-object
*[task]: another name for a ROAR assessment (e.g., ROAR-SWR, ROAR-MEP, etc.)
*[variant]: a specific variation of a task (e.g., adaptive vs. random)
*[trial]: a single stimulus/response pair
