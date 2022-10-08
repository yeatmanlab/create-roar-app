import { log } from './logger';

// eslint-disable-next-line no-undef
const rootDoc = ROAR_DB_DOC === 'production' ? ['prod', 'roar-prod'] : ['dev', '{{kebab name}}'];

/* eslint-disable import/prefer-default-export */
export const roarConfig = {
  firebaseConfig: {
    apiKey: 'AIzaSyCX9WR-j9yv1giYeFsMpbjj2G3p7jNHxIU',
    authDomain: 'gse-yeatmanlab.firebaseapp.com',
    projectId: 'gse-yeatmanlab',
    storageBucket: 'gse-yeatmanlab.appspot.com',
    messagingSenderId: '292331000426',
    appId: '1:292331000426:web:91a04220991e3405737013',
    measurementId: 'G-0TBTMDS993',
  },
  rootDoc: rootDoc,
};

const logMessage =
  `This ROAR app will write data to the ${roarConfig.projectId} ` +
  `Firestore database under the document ${rootDoc.join(' > ')}.`;
log.info(logMessage);
