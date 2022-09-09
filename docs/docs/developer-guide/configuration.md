# Configuring your ROAR app

Help your ROAR app communicate with the Firestore database and the dashboard.

---

## Make your first commit

Before we start configuring your app, let's commit the files that the `create-roar-app` initializer created in your app directory.

=== "screencast"

    <!-- markdownlint-disable MD033 -->
    <script id="asciicast-9cOSw1RyEZNPMC1l6rfSouuVD" src="https://asciinema.org/a/9cOSw1RyEZNPMC1l6rfSouuVD.js" async></script>

=== "code only"

    ```sh
    git add .
    git commit -m "First commit. Add files created by the create-roar-app initializer"
    ```

Now that you've committed the initial files, we are ready to configure your experiment.

## Search for `TODO` items

The app template that you used has some placeholder `TODO` items in different JavaScript files. You can find all of the placeholder by using `git grep` in the root level of your repository.

=== "screencast"

    <script id="asciicast-r5a3WI4BLRNbkhWyrIfr9jdfx" src="https://asciinema.org/a/r5a3WI4BLRNbkhWyrIfr9jdfx.js" async></script>

=== "code only"

    ```sh
    git grep "TODO"
    ```

We will complete these `TODO` items in the sections below.

## Communicate with the dashboard

<!-- markdownlint-disable MD034 -->
ROAR apps communicate with the participant dashboard by passing parameters through the [URL's query string](https://en.wikipedia.org/wiki/Query_string). Suppose that your app is hosted at the website https://my-roar-app.web.app. The dashboard can be made to append a "pipeline" parameter. For example, https://my-roar-app.web.app?pipeline=rc for the REDCap pipeline. Similarly, at the end of the assessment the ROAR app communicates with the dashboard using URL parameters for a game token, "g", and a completion status, "c". For example, https://reading.stanford.edu/?g=1234&c=1 would communicate to the dashboard that the participant has completed the game with game token 1234.

There are lines of JavaScript code in `config.js` that inspect the "pipeline" parameter of the URL query string and construct the appropriate redirect URL to communicate back with the dashboard. In the screencast below, we edit the `src/config.js` file, first searching for the `TODO` items and then inserting the configuration information.

??? info "Expand this for a note about our choice of text editor"

    We're using the [micro text editor](https://micro-editor.github.io/) in the screencast below because it's a terminal-based text editor that plays nicely with the screencasting software that we use in this guide. You should use whatever text editor you are already comfortable with. If you don't already have a favorite text editor, we recommend [:material-microsoft-visual-studio-code: VS Code](https://code.visualstudio.com/). 

=== "screencast"

    <script id="asciicast-dalJ0aTmp2SgM8DneAgR9m8IC" src="https://asciinema.org/a/dalJ0aTmp2SgM8DneAgR9m8IC.js" async></script>

=== "code only"

    We get it. You're not the screencast type. But we're editing a file in this example and it's difficult to show that using only shell commands.
    
    But just for reference, we're completing the `TODO` items in `src/config.js`.

## Commit your changes

Now that you've configured your application to communicate with the dashboard, you should commit your changes.

=== "screencast"

    <script id="asciicast-7GToSo2Nuw96yvNJFeGtJJAtf" src="https://asciinema.org/a/7GToSo2Nuw96yvNJFeGtJJAtf.js" async></script>

=== "code only"

    ```sh
    git add -u
    git commit -m "Configure dashboard redirect based on pipiline URL parameter."
    ```

From now on, we won't show you screencasts or code snippets for committing your changes into your git repository. But this is something that you should do very frequently.

## Communicate with the Firestore database

ROAR apps store each trial's data in a [Firestore database](https://firebase.google.com/docs/firestore). In order to communicate with Firebase, your app needs to know certain metadata about your Firebase project. If you are developing an app for the [Brain Development and Education Lab (BDELab)](https://www.brainandeducation.com/), then you don't have to do anything because the correct metadata has already been filled in. If you're developing for another organization, you'll have to supply your [Firebase project configuration](https://firebase.google.com/docs/web/learn-more#config-object) in the `src/firebaseConfig.js` file.

The BDELab's Firestore database has separate collections for development and production data. So while you are developing your app, any trial data that you produce is kept separate from the experimental data of our in-production apps. Once you are ready to deploy your experiment in production, you simply need to change the `rootDoc` property of the `roarConfig` object in the `src/firebaseConfig.js` file. See below for a screencast of this process. But be sure to change it back to the development line while you are still writing your web assessment.

=== "screencast"

    <script id="asciicast-uzlc0M4lg4Qjp8GFm8YyiD8tq" src="https://asciinema.org/a/uzlc0M4lg4Qjp8GFm8YyiD8tq.js" async></script>

=== "code only"

    We get it. You're not the screencast type. But we're editing a file in this example and it's difficult to show that using only shell commands.
    
    But just for reference, when you are ready to deploy your ROAR app in production, uncomment line 14 of `src/firebaseConfig.js` and comment out line 15 of the same file. Don't do this until you are ready to release your experiment "into the wild."
