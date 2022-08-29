// import { QuestCreate } from "jsQUEST";
import { initJsPsych } from "jspsych";

/* set user mode */
const queryString = new URL(window.location).search;
const urlParams = new URLSearchParams(queryString);
const pid = urlParams.get("participant") || null;
const pipeline = urlParams.get("pipeline") || null;
const studyId = urlParams.get("studyId") || null;
const classId = urlParams.get("classId") || null;
const schoolId = urlParams.get("schoolId") || null;

// ROAR apps communicate with the participant dashboard by passing parameters
// through the URL. The dashboard can be made to append a "pipeline" parameter
// e.g., https://{{kebab name}}.web.app?pipeline=rc for the REDCap pipeline.
// Similarly, at the end of the assessment the ROAR app communicates with the
// dashboard using URL parameters for a game token, "g", and a completion
// status, "c", e.g., https://reading.stanford.edu/?g=1234&c=1.  Here we inspect
// the "pipeline" parameter that was passed through the URL query string and
// construct the appropriate redirect URL.
// TODO: Customize the redirect URLs here by inserting the correct game token.
const redirect = () => {
  // TODO: Replace the pipeline value here with one that you want
  if (pipeline === "insert-pipeline-value-1-here") {
    // TODO: Fix the redirect URL here by replacing the 'XXXX' in the URL below
    window.location.href = "https://reading.stanford.edu/?g=XXXX&c=1";
  // TODO: Replace the pipeline value here with one that you want
  } else if (pipeline === "insert-pipeline-value-2-here") {
    // TODO: Fix the redirect URL here by replacing the 'XXXX' in the URL below
    window.location.href = "https://reading.stanford.edu/?g=XXXX&c=1";
  // TODO: Replace the pipeline value here with one that you want
  } else if (pipeline === "insert-pipeline-value-4-here") {
    // Here, we refresh the page rather than redirecting back to the dashboard
    window.location.reload();
  }
  // You can add additional pipeline-dependent redirect URLs here using
  // additional `else if` clauses.
};

function configTaskInfo() {
  // TODO: Edit taskInfo here. The information will be used to populate the task
  // metadata in the Firestore database.
  const taskInfo = {
    taskId: "{{kebab name}}",
    taskName: "{{capital name space=true}}",
    variantName: "{{kebab variant}}",
    taskDescription: "{{taskDescription}}",
    variantDescription: "{{variantDescription}}",
    // TODO: Edit the blocks below to better reflect your task/variant
    blocks: [
      {
        blockNumber: 0,
        trialMethod: "fixed", // could be "random", "adaptive", "fixed", etc.
        corpus: "practice_block", // should be the name or URL of some corpus
      },
      {
        blockNumber: 1,
        trialMethod: "fixed", // could be "random", "adaptive", "fixed", etc.
        corpus: "exercise_block", // should be the name or URL of some corpus
      },
    ],
  };

  return taskInfo;
}

export const taskInfo = configTaskInfo();

export const config = {
  pid: pid,
  studyId: studyId,
  classId: classId,
  schoolId: schoolId,
  // TODO: You can add additional user metadata here
  userMetadata: {},
  startTime: new Date(),
  urlParams: urlParams,
};

export const jsPsych = initJsPsych({
  show_progress_bar: true,
  auto_update_progress_bar: false,
  message_progress_bar: "Progress Complete",
  on_finish: () => {
    redirect();
  },
});

/* csv helper function */
export const readCSV = (url) =>
  new Promise((resolve) => {
    Papa.parse(url, {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: function (results) {
        const csv_stimuli = results.data;
        resolve(csv_stimuli);
      },
    });
  });
