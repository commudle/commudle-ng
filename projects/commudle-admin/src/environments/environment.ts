// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // app_url: 'http://localhost:3000',
  // base_url: 'http://localhost:3000',
  // action_cable_url: 'http://localhost:3000/live',
  // auth_cookie_name: 'dev_commudle_user_auth',
  // zoom_call_server_url: 'http://localhost:4000',

  session_cookie_name: 'cmdle_sess',

  app_url: 'https://commudle.com',
  base_url: 'https://json.commudle.com',
  action_cable_url: 'https://json.commudle.com/live',
  auth_cookie_name: 'commudle_user_auth',
  zoom_call_server_url: 'https://zoom.commudle.com',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
