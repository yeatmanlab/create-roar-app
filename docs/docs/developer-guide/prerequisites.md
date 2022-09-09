# ROAR development prerequisites

What do you need to get started?

---

## Prerequisite knowledge

Before you start developing ROAR apps, it is helpful to have some knowledge of the topics listed below. Don't be intimidated if you're not familiar with some things.

!!! tip "Imposter's Syndrome Disclaimer"

    There may be a little voice inside your head that is telling you
    that you're not ready to develop a ROAR application; that your
    skills aren't nearly good enough to contribute. What could you
    possibly offer a project like this one?

    We assure you - the little voice in your head is wrong. If you can
    write at all, you can write a ROAR app. Creating your first web
    assessment is a fantastic way to advance one's coding skills.
    Writing perfect code isn't the measure of a good developer (that
    would disqualify all of us!); it's trying to create something,
    making mistakes, and learning from those mistakes.  That's how we
    all improve, and we are happy to help others learn.

Here's what you need to know:

- :fontawesome-brands-square-js: **Familiarity with Javascript**

    We will be developing your web assessment in JavaScript, a programming
    language that is one of the core technologies of the web. Web development
    with JavaScript can be efficient and fun! But teaching you JavaScript is
    beyond the scope of this guide. Instead, we recommend some the following
    resources:

      * [The Modern JavaScript Tutorial](https://javascript.info/)
      * [W3Schools JavaScript Tutorial](https://www.w3schools.com/js/)
      * [MDN Web Docs for JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
      * [JavaScript for Data Science](https://third-bit.com/js4ds/)

- :fontawesome-solid-brain: **Familiarity with jsPsych**

    ROAR apps use [jsPsych](https://www.jspsych.org/7.0/) to create
    browser-based cognitive and behavioral assessments. jsPsych has some
    nice documentation to help you get started.

    !!! quote "From jsPsych's own documentation"

        [The page on timelines](https://www.jspsych.org/7.0/overview/timeline/) is a
        good place to start learning about jsPsych. From there, you might want to
        complete the [hello world
        tutorial](https://www.jspsych.org/7.0/tutorials/hello-world/) to learn how
        to set up a jsPsych experiment and the [reaction time experiment
        tutorial](https://www.jspsych.org/7.0/tutorials/rt-task/) to learn the core
        features of the framework.

- :octicons-command-palette-16: **Familiarity with the command shell**

    You will use the command shell to initialize your app and start your
    development server. We may use the words "shell", "console", "bash", or "command prompt" interchangeably. If you are new to the shell, we recommend the [Software Carpentry introduction to the Unix shell](https://swcarpentry.github.io/shell-novice/).

- :fontawesome-brands-git-alt::fontawesome-brands-github: **Some knowledge of git and GitHub**

    [git](https://git-scm.com/) is a really useful tool for version control.
    [GitHub](https://github.com/) sits on top of git and supports collaborative
    and distributed working.

    If you're not yet familiar with git, there are lots of great resources to
    help you git started! Some of our favorites include the [git
    Handbook](https://guides.github.com/introduction/git-handbook/) and the
    [Software Carpentry introduction to
    git](http://swcarpentry.github.io/git-novice/).

## Software Prerequisites

In addition to the prerequisite knowledge above, you will need some software:

- :octicons-command-palette-16: **A command shell**

    A shell is a program where users can type commands. The terms "shell,"
    "command shell", and "terminal" are used interchangeably throughout this
    guide. If you don't already have a command shell installed, you can follow
    [these helpful instructions from The
    Carpentries](https://carpentries.github.io/workshop-template/#shell) to
    install the Bash shell. If you're not sure how to open a terminal on your
    operating system, see [these
    instructions](https://swcarpentry.github.io/shell-novice/setup.html#where-to-type-commands-how-to-open-a-new-shell),
    also courtesy of [The Carpentries](https://carpentries.org/).

- :material-text-box-edit-outline: **A text editor**

    When you're writing code, it's nice to have a text editor that is optimized
    for writing code, with features like automatic color-coding of key words.
    The text editor that we recommend for ROAR development is [:material-microsoft-visual-studio-code: VS Code](https://code.visualstudio.com/). For JavaScript development, you might also want to install these extensions

      - [JavaScript (ES6) code snippets](https://marketplace.visualstudio.com/items?itemName=xabikos.JavaScriptSnippets)
      - [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
      - [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
      - [Quokka.js](https://marketplace.visualstudio.com/items?itemName=WallabyJs.quokka-vscode)

    The default text editor on macOS and Linux is usually set to Vim, which is
    not famous for being intuitive. If you accidentally find yourself stuck in
    it, hit the ++escape++ key, followed by
    ++colon+q+exclam++ (colon, lower-case 'q', exclamation
    mark), then hitting ++enter++ to return to the shell.

- :fontawesome-brands-node-js: **node.js**

    The ROAR development kit requires Node.js, a JavaScript runtime environment.
    Download and [install Node.js here](https://nodejs.org/en/). You’ll need to
    have Node 14.0.0 or later version on your local development machine. We
    recommend using the latest LTS version. You can use
    [nvm](https://github.com/creationix/nvm#installation) (macOS/Linux) or
    [nvm-windows](https://github.com/coreybutler/nvm-windows#node-version-manager-nvm-for-windows)
    to switch Node versions between different projects.

- :fontawesome-brands-git-alt: **git and a** :fontawesome-brands-github: **GitHub account**

    Follow the [Software Carpentry instructions for downloading
    Git](https://carpentries.github.io/workshop-template/#git).  You will also
    need an account at [github.com](https://github.com/). Basic GitHub accounts
    are free.
