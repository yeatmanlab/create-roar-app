# Contributing to the ROAR development guide

Help make the development experience even better

---

The ROAR development guide helps people develop their own web assessments using the ROAR framework. This page is about contributing directly to the development guide and the `create-roar-app` tempate.

The ROAR project welcomes, and depends, on contributions from BDE Lab members and the broader web assessment community. Contributions can be made in a number of
ways, a few examples are:

- Code patches via pull requests
- Documentation improvements
- Bug reports and patch reviews
- Development of new ROAR assessments

!!! tip "Imposter's syndrome disclaimer[^1]"

    **We want your help. No, really.**

    There may be a little voice inside your head that is telling you that
    you're not ready to be an open-source contributor; that your skills
    aren't nearly good enough to contribute. What could you possibly offer a
    project like this one?

    We assure you - the little voice in your head is wrong. If you can
    write code at all, you can contribute code to open-source. Contributing
    to open-source projects is a fantastic way to advance one's coding
    skills. Writing perfect code isn't the measure of a good developer (that
    would disqualify all of us!); it's trying to create something, making
    mistakes, and learning from those mistakes. That's how we all improve,
    and we are happy to help others learn.

    Being an open-source contributor doesn't just mean writing code, either.
    You can help out by writing documentation, tests, or even giving
    feedback about the project (and yes - that includes giving feedback
    about the contribution process). Some of these contributions may be the
    most valuable to the project as a whole, because you're coming to the
    project with fresh eyes, so you can see the errors and assumptions that
    seasoned contributors have glossed over.

    [^1]: The imposter syndrome disclaimer was originally written by
        [Adrienne Lowe](https://github.com/adriennefriend) for a
        [PyCon talk](https://www.youtube.com/watch?v=6Uj746j9Heo), and was
        adapted based on its use in the README file for the
        [MetPy project](https://github.com/Unidata/MetPy).

## Practical guide to submitting your contribution

These guidelines are designed to make it as easy as possible to get involved.
If you have any questions that aren't discussed below,
please let us know by opening an [issue][link_issues]!

Before you start, you'll need to set up a free [GitHub][link_github] account and sign in.
Here are some [instructions][link_signupinstructions].

Already know what you're looking for in this guide? Jump to the following sections:

- [Joining the conversation](#joining-the-conversation)
- [Contributing through GitHub](#contributing-through-github)
- [Understanding GitHub issues](#understanding-github-issues)
- [Making a change](#making-a-change)
- [Coding style](#roar-coding-style-guide)
- [Documentation](#writing-documentation)

## Joining the conversation

*ROAR* is primarily maintained by a [collaborative research group][bdelab].
But we maintain this software as an open project. This means that we welcome
contributions from people outside our group and we make sure to give
contributors from outside our group credit in presentations of the work.
In other words, we're excited to have you join!
Most of our discussions will take place on open [issues][link_issues].
We actively monitor this space and look forward to hearing from you!

## Contributing through GitHub

[git][link_git] is a really useful tool for version control.
[GitHub][link_github] sits on top of git and supports collaborative and distributed working.

If you're not yet familiar with git, there are lots of great resources to help you *git* started!
Some of our favorites include the [git Handbook][link_handbook] and
the [Software Carpentry introduction to git][link_swc_intro].

## Writing Markdown

On GitHub, you'll use [Markdown][markdown] to chat in issues and pull requests. You'll also use Markdown to contribute to the documentation in this developer's guide.
You can think of Markdown as a few little symbols around your text that will
render the text with a little bit of formatting.
For example, you could write words as bold (`**bold**`), or in italics (`*italics*`),
or as a [link][rick_roll] (`[link](https://youtu.be/dQw4w9WgXcQ)`) to another webpage.

GitHub has a really helpful page for getting started with
[writing and formatting Markdown on GitHub][writing_formatting_github].

## Understanding GitHub issues

Every project on GitHub uses [issues][link_issues] slightly differently.
The following outlines how the *ROAR* developers think about these tools.

**Issues** are individual pieces of work that need to be completed to move the project forward.
A general guideline: if you find yourself tempted to write a great big issue that
is difficult to be described as one unit of work, please consider splitting it into two or more issues.

Issues are assigned [labels](#issue-labels) which explain how they relate to the overall project's
goals and immediate next steps.

### Issue Labels

The current list of issue labels are [here][link_labels] and include:

- [![Good first issue](https://img.shields.io/github/labels/yeatmanlab/create-roar-app/good%20first%20issue)][link_firstissue] *These issues contain a task that is amenable to new contributors.*

    If you feel that you can contribute to one of these issues,
    we especially encourage you to do so!

- [![Bug](https://img.shields.io/github/labels/yeatmanlab/create-roar-app/bug)][link_bugs] *These issues point to problems in the project.*

    If you find new a bug, please give as much detail as possible in your issue,
    including steps to recreate the error.
    If you experience the same bug as one already listed,
    please add any additional information that you have as a comment.

- [![Enhancement](https://img.shields.io/github/labels/yeatmanlab/create-roar-app/enhancement)][link_enhancement] *These issues are asking for new features and improvements to be considered by the project.*

    Please try to make sure that your requested feature is distinct from any others
    that have already been requested or implemented.
    If you find one that's similar but there are subtle differences,
    please reference the other request in your issue.

- [![Documentation](https://img.shields.io/github/labels/yeatmanlab/create-roar-app/documentation)][link_documentation] *These issues are for improvements or additions to documentation.*

    Writing documentation is one of the most important types of contributions that you can make. Good documentation helps users and developers, new and seasoned, in using and enhancing the ROAR ecosystem.

## Making a change

We appreciate all contributions to *ROAR*,
but those accepted fastest will follow a workflow similar to the following:

1. **Comment on an existing issue or open a new issue referencing your addition.**

    This allows other members of the *ROAR* development team to confirm that you
    aren't overlapping with work that's currently underway and that everyone is on
    the same page with the goal of the work you're going to carry out. [This
    blog][link_pushpullblog] is a nice explanation of why putting this work in up
    front is so useful to everyone involved.

1. **[Fork][link_fork] the [ROAR repository][link_create_roar_app] to your profile.**

    This is now your own unique copy of *ROAR*.
    Changes here won't effect anyone else's work, so it's a safe space to explore edits to the code!
    On your own fork of the repository, select Settings -> Actions-> "Disable Actions for this repository" to avoid flooding your inbox with warnings from our continuous integration suite.

1. **[Clone][link_clone] your forked ROAR repository to your machine/computer.**

    While you can edit files [directly on github][link_githubedit], sometimes the changes
    you want to make will be complex and you will want to use a [text editor][link_texteditor]
    that you have installed on your local machine/computer.
    (One great text editor is [vscode][link_vscode]).
    In order to work on the code locally, you must clone your forked repository.
    To keep up with changes in the create-roar-app repository,
    add the ["upstream" create-roar-app repository as a remote][link_addremote]
    to your locally cloned repository.

        git remote add upstream https://github.com/yeatmanlab/create-roar-app.git

    Make sure to [keep your fork up to date][link_updateupstreamwiki] with the upstream repository. For example, to update your master branch on your local cloned repository:

        git fetch upstream
        git checkout master
        git merge upstream/master

1. **Create a [new branch][link_branches] to develop and maintain the proposed code changes.**

    For example:

        git fetch upstream  # Always start with an updated upstream
        git checkout -b fix/bug-1222 upstream/master

    Please consider using appropriate branch names as those listed below, and mind that some of them
    are special (e.g., `doc/` and `docs/`):

      - `fix/<some-identifier>`: for bugfixes
      - `enh/<feature-name>`: for new features
      - `doc/<some-identifier>`: for documentation improvements.
        You should name all your documentation branches with the prefix `doc/` or `docs/`
        as that will preempt triggering the full battery of continuous integration tests.

1. **Make the changes you've discussed, following the [ROAR coding style guide](#roar-coding-style-guide).**

    Try to keep the changes focused: it is generally easy to review changes that address one feature or bug at a time.
    Once you are satisfied with your local changes, [add/commit/push them][link_add_commit_push]
    to the branch on your forked repository.

1. **Submit a [pull request][link_pullrequest].**

    A member of the development team will review your changes to confirm
    that they can be merged into the main code base.
    Pull request titles should begin with a descriptive prefix
    (for example, `ENH: Adding another template`):

    - `ENH`: enhancements or new features
    - `FIX`: bug fixes
    - `TST`: new or updated tests
    - `DOC`: new or updated documentation
    - `STY`: style changes
    - `REF`: refactoring existing code
    - `CI`: updates to continous integration infrastructure
    - `MAINT`: general maintenance
    - For works-in-progress, add the `WIP` tag in addition to the descriptive prefix.
        Pull-requests tagged with `WIP:` will not be merged until the tag is removed.

1. **Have your PR reviewed by the development team, and update your changes accordingly in your branch.**

    The reviewers will take special care in assisting you to address their comments, as well as dealing with conflicts
    and other tricky situations that could emerge from distributed development.

## ROAR coding style guide

!!! bug

    TODO: Fill this in with tslint and markdown lint information.

## Writing documentation

Improving our documentation is often the most effective way to contribute to ROAR. This documentation guide is created using [Material for MkDocs](https://squidfunk.github.io/mkdocs-material/), which creates a website from a collection of Markdown files. There is an edit button displayed at the top of each document on this website. You may click that button to propose edits to any page. You can also fork and clone the entire repository as outlined above.

[link_github]: https://github.com/
[link_create_roar_app]: https://github.com/yeatmanlab/create-roar-app
[link_signupinstructions]: https://help.github.com/articles/signing-up-for-a-new-github-account

[link_git]: https://git-scm.com/
[link_handbook]: https://guides.github.com/introduction/git-handbook/
[link_swc_intro]: http://swcarpentry.github.io/git-novice/

[writing_formatting_github]: https://help.github.com/articles/getting-started-with-writing-and-formatting-on-github
[markdown]: https://daringfireball.net/projects/markdown
[rick_roll]: https://www.youtube.com/watch?v=dQw4w9WgXcQ

[bdelab]: https://www.brainandeducation.com/
[link_issues]: https://github.com/yeatmanlab/create-roar-app/issues
[link_labels]: https://github.com/yeatmanlab/create-roar-app/labels

[link_bugs]: https://github.com/yeatmanlab/create-roar-app/labels/bug
[link_firstissue]: https://github.com/yeatmanlab/create-roar-app/labels/good%20first%20issue
[link_enhancement]: https://github.com/yeatmanlab/create-roar-app/labels/enhancement
[link_documentation]: https://github.com/yeatmanlab/create-roar-app/labels/documentation

[link_pullrequest]: https://help.github.com/articles/creating-a-pull-request-from-a-fork
[link_fork]: https://help.github.com/articles/fork-a-repo/
[link_clone]: https://help.github.com/articles/cloning-a-repository
[link_githubedit]: https://help.github.com/articles/editing-files-in-your-repository
[link_texteditor]: https://en.wikipedia.org/wiki/Text_editor
[link_vscode]: https://code.visualstudio.com/
[link_addremote]: https://help.github.com/articles/configuring-a-remote-for-a-fork
[link_pushpullblog]: https://www.igvita.com/2011/12/19/dont-push-your-pull-requests/
[link_branches]: https://help.github.com/articles/creating-and-deleting-branches-within-your-repository/
[link_add_commit_push]: https://help.github.com/articles/adding-a-file-to-a-repository-using-the-command-line
[link_updateupstreamwiki]: https://help.github.com/articles/syncing-a-fork/
