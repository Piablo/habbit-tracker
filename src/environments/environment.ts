// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  
  firebase: {
    apiKey: "AIzaSyB67au7fSe2FQENkjfhTSfvlq9P3yaZIbw",
    authDomain: "habbit-tracker-686ee.firebaseapp.com",
    databaseURL: "https://habbit-tracker-686ee.firebaseio.com",
    projectId: "habbit-tracker-686ee",
    storageBucket: "",
    messagingSenderId: "187873554455"
  }
};

/*
* In development mode, to ignore zone related error stack frames such as
* `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
* import the following file, but please comment it out in production mode
* because it will have performance impact when throw error
*/
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
