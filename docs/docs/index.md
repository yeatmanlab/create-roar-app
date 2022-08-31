#![ROAR logo](assets/roar-logo.png){: style="width:61.8%; margin-bottom: 0px;"}

<h1 style="text-align: center;">Developer's Guide</h1>

Write your own ROAR apps for great good!

---
<!-- markdownlint-disable MD033 -->

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

[introductory tutorial]: getting-started.md
[User Guide]: developer-guide/index.md

<div class="text-center">
<a href="getting-started/" class="btn btn-primary" role="button">Getting Started</a>
<a href="developer-guide/" class="btn btn-primary" role="button">Developer Guide</a>
</div>

<div class="jumbotron">
<h2 class="display-4 text-center">Features</h2>

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Write your assessment using jsPsych</h3>
        <p class="card-text">
            ROAR apps use <a href="https://www.jspsych.org/7.0/">jsPsych</a> to
            create browser-based cognitive and behavioral assessments.
            jsPsych has an extensive <a
            href="https://www.jspsych.org/7.0/overview/plugins">plugin
            environment</a> to present stimuli and record responses.
            And if you can't find the plugin you need, you can browse an open
            repository of <a
            href="https://github.com/jspsych/jspsych-contrib/">community
            contributed plugins</a>, some of which were created at the <a
            href="https://www.brainandeducation.com/">Brain Development and
            Education Lab</a>.
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Easily write trial data to a database</h3>
        <p class="card-text">
            ROAR apps write trial data to a <a
            href="https://firebase.google.com/docs/firestore">Firestore
            database</a> using the <a
            href="https://www.npmjs.com/package/@bdelab/roar-firekit">roar-firekit</a>
            library. Trial data is written in real-time, so it's no problem if a
            participant quits in the middle of a run.  With offline data
            persistence, if your participant goes offline, your app will write
            trial data to a cache and synchronize changes to the database when
            the participant's device comes back online.
        </p>
      </div>
    </div>
  </div>
</div>

<div class="row">
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Preview your app as you work</h3>
        <p class="card-text">
            The built-in dev-server allows you to preview your ROAR assessment
            as you're writing it. It will even auto-reload and refresh your
            browser whenever you save your changes.
        </p>
      </div>
    </div>
  </div>
  <div class="col-sm-6">
    <div class="card">
      <div class="card-body">
        <h3 class="card-title">Host anywhere</h3>
        <p class="card-text">
            ROAR-apps build deployment files that you can host on GitHub pages,
            Amazon S3, Firebase hosting, or <a
            href="user-guide/deploying-your-experiment/">anywhere</a> else you
            choose.
        </p>
      </div>
    </div>
  </div>
</div>
</div>
