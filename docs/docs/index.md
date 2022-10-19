<!-- markdownlint-disable MD033 -->
<h1 class="text-center" style="margin-bottom: 0rem;">
  <img src="assets/roar-logo.png" alt="ROAR logo" style="width: 61.8%; margin-bottom: 0px;" />
  <br>
  Developer's Guide
</h1>

Write your own ROAR apps for great good!

---

The **Rapid Online Assessment of Reading** (ROAR) is an ongoing academic
research project and online platform for assessing foundational reading skills.
The ROAR is a suite of measures; each is delivered through the web browser and
does not require a test administrator. The ROAR rapidly provides highly reliable
indices of reading ability consistent with scores on other standardized reading
assessments.

This website serves as a development guide for researchers wishing to author
their own ROAR applications. If you are an educator, clinician, student, or
parent wishing to learn more about the ROAR, please visit the [ROAR
website](https://roar.stanford.edu/).

## Features { class="text-center" }

??? check ":material-brain: Write your assessments using **jsPsych**"

    ROAR apps use [jsPsych](https://www.jspsych.org/7.0/) to
    create browser-based cognitive and behavioral assessments.
    jsPsych has an extensive [plugin environment](https://www.jspsych.org/7.0/overview/plugins) to present stimuli and record responses.
    And if you can't find the plugin you need, you can browse an open
    repository of [community contributed plugins](https://github.com/jspsych/jspsych-contrib/), some of which were created at the 
    [Brain Development and Education Lab](https://www.brainandeducation.com/).

??? check ":material-firebase: Easily write trial data to a **Firestore** database"

    ROAR apps write trial data to a [Firestore database](https://firebase.google.com/docs/firestore) using the
    [roar-firekit](https://www.npmjs.com/package/@bdelab/roar-firekit)
    library. Trial data is written in real-time, so it's no problem if a
    participant quits in the middle of a run.  With offline data
    persistence, if your participant goes offline, your app will write
    trial data to a cache and synchronize changes to the database when
    the participant's device comes back online.

??? check ":material-code-braces-box: Preview your app as you work"

    The built-in dev-server allows you to preview your ROAR assessment
    as you're writing it. It will even auto-reload and refresh your
    browser whenever you save your changes.

??? check ":material-cloud-upload: Host anywhere"

    ROAR-apps build deployment files that you can host on GitHub pages, Amazon
    S3, Firebase hosting, or [anywhere else](developer-guide/deploying-your-experiment/) else you choose.

<div class="text-center" markdown>
[Developer's Guide](developer-guide/){ .md-button }
</div>
