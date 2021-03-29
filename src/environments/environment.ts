// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  webServerUrl:
    'https://europe-west1-rsvp-events-9aec5.cloudfunctions.net/main',
  firebase: {
    apiKey: 'AIzaSyCYhfQXK1hmDlp6af0JpxrQAKu3y3SzEjc',
    authDomain: 'rsvp-events-9aec5.firebaseapp.com',
    projectId: 'rsvp-events-9aec5',
    storageBucket: 'rsvp-events-9aec5.appspot.com',
    messagingSenderId: '418546343899',
    appId: '1:418546343899:web:124dba61181f14052351fe',
    measurementId: 'G-6F5ZNY9FEZ',
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
