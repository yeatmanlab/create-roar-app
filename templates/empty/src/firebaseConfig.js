/* eslint-disable import/prefer-default-export */
export const roarConfig = {
  firebaseConfig: {
    apiKey: "AIzaSyCX9WR-j9yv1giYeFsMpbjj2G3p7jNHxIU",
    authDomain: "gse-yeatmanlab.firebaseapp.com",
    projectId: "gse-yeatmanlab",
    storageBucket: "gse-yeatmanlab.appspot.com",
    messagingSenderId: "292331000426",
    appId: "1:292331000426:web:91a04220991e3405737013",
    measurementId: "G-0TBTMDS993",
  },
  // TODO: When you are ready to "release your app into the wild," and collect
  // data, uncomment the next line and comment the one after it.
  // rootDoc: ["prod", "roar-prod"],
  rootDoc: ["dev", "{{kebab name}}"],
};
