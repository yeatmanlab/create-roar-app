# ROAR App Installation

Use the create-roar-app template to create your app

---

## Installation

To create a new app, first navigate to the directory in which you want to store all of your ROAR assessments. For example

```sh
mkdir -p ~/roar-apps
cd ~/roar-apps
```

You may then choose one of the following methods:

!!! example "Installation options"

    === "npx (recommended)"

        ```sh
        npx create-roar-app@latest my-roar-app
        ```

        _[npx](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b) is a package runner tool that comes with npm 5.2+ and higher._

    === "npm"

        ```sh
        npm init roar-app@latest my-roar-app
        ```

        _`npm init <initializer>` is available in npm 6+_

    === "yarn"

        ```sh
        yarn create roar-app@latest my-roar-app
        ```

        _[`yarn create <starter-kit-package>`](https://yarnpkg.com/lang/en/docs/cli/create/) is available in Yarn 0.25+_

Follow the on-screen prompts and answer questions about your application. Here's an example:

<!-- markdownlint-disable MD033 -->
<script id="asciicast-ww6nV9rc3xaPings0XGLlQO46" src="https://asciinema.org/a/ww6nV9rc3xaPings0XGLlQO46.js" async></script>

This will create a directory called `my-roar-app` inside the current folder.<br>
Inside that directory, it will generate the initial project structure and install some  dependencies. Once the installation is done, you can navigate to your project folder:

```sh
cd my-roar-app
```

and make edits to your experiment's code. See the following pages for more detail:

- [Configuration](configuration.md)
- [Writing Your Experiment](writing-your-experiment.md)
- [Styling](styling.md)

## Available commands

Inside the newly created project, you can run some built-in commands:

!!! example "Start a development server"

    === "npm"

        ```sh
        npm start
        ```

    === "yarn"

        ```sh
        yarn start
        ```

Runs the app in development mode.<br>
Visit [http://localhost:8080](http://localhost:8080) to view it in the browser.

The page will automatically reload if you make changes to the code.

We recommend using the [Google Chrome](https://www.google.com/chrome/) browser
for your web development. Use the [Chrome DevTools](https://developer.chrome.com/docs/devtools/open/) to [view your web application's DOM](https://developer.chrome.com/docs/devtools/dom/) or [debug your JavaScript](https://developer.chrome.com/docs/devtools/javascript/).

To stop the development server in your console, press ++ctrl+c++.

!!! example "Build your app for deployment"

    === "npm"

        ```sh
        npm run build
        ```

    === "yarn"

        ```sh
        yarn build
        ```

Builds the app for production to the `dist` folder.<br>
This correctly bundles your ROAR app in production mode and optimizes the build for the best performance.

Your app is then ready [to be deployed](deploying-your-experiment.md).

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
