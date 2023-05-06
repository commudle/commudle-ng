type Environment = {
  production: boolean;
  session_cookie_name: string;
  app_url: string;
  base_url: string;
  action_cable_url: string;
  anycable_url: string;
  auth_cookie_name: string;
  zoom_call_server_url: string;
  vapid_public_key: string;
  google_client_id: string;
};

const environments: { [type: string]: Environment } = {
  local: {
    production: false,
    session_cookie_name: 'cmdle_sess',
    app_url: 'http://localhost:4200',
    base_url: 'http://localhost:3000',
    action_cable_url: 'http://localhost:3000/live',
    anycable_url: 'ws://localhost:3334/cable',
    auth_cookie_name: 'dev_commudle_user_auth',
    zoom_call_server_url: 'http://localhost:4000',
    vapid_public_key: 'BB5xVItCcvm8oybyS98PqOf7lEFlr4P0JEYnZuLHpQxUtht9pIO4ebaVye6a2iNnM7fG67zlCLEgqVJxm7j3LyA=',
    google_client_id: '432745930633-vc668ls5qi0bf9lit9sp5fhnf18vka8l.apps.googleusercontent.com',
  },
  test: {
    production: false,
    session_cookie_name: 'cmdle_sess',
    app_url: 'https://t.commudle.com',
    base_url: 'https://t.commudle.com',
    action_cable_url: 'https://t.commudle.com/live',
    anycable_url: 'wss://wst.commudle.com/cable',
    auth_cookie_name: 'dev_commudle_user_auth',
    zoom_call_server_url: 'https://zoomt.commudle.com',
    vapid_public_key: 'BB5xVItCcvm8oybyS98PqOf7lEFlr4P0JEYnZuLHpQxUtht9pIO4ebaVye6a2iNnM7fG67zlCLEgqVJxm7j3LyA=',
    google_client_id: '432745930633-vc668ls5qi0bf9lit9sp5fhnf18vka8l.apps.googleusercontent.com',
  },
  staging: {
    production: false,
    session_cookie_name: 'cmdle_sess',
    app_url: 'https://www.commudle.com',
    base_url: 'https://json.commudle.com',
    action_cable_url: 'https://json.commudle.com/live',
    anycable_url: 'wss://ws.commudle.com/cable',
    auth_cookie_name: 'commudle_user_auth',
    zoom_call_server_url: 'https://zoom.commudle.com',
    vapid_public_key: 'BKK5b61SLimEeIdVcYTGqp-zOkSVooNfKF6JX-_-N2eDza_tzZldncoCHdZtl8xHQ-cX20Vo7lBGo_p5n7hVG4g=',
    google_client_id: '432745930633-vc668ls5qi0bf9lit9sp5fhnf18vka8l.apps.googleusercontent.com',
  },
  production: {
    production: false,
    session_cookie_name: 'cmdle_sess',
    app_url: 'https://www.commudle.com',
    base_url: 'https://json.commudle.com',
    action_cable_url: 'https://json.commudle.com/live',
    anycable_url: 'wss://ws.commudle.com/cable',
    auth_cookie_name: 'commudle_user_auth',
    zoom_call_server_url: 'https://zoom.commudle.com',
    vapid_public_key: 'BKK5b61SLimEeIdVcYTGqp-zOkSVooNfKF6JX-_-N2eDza_tzZldncoCHdZtl8xHQ-cX20Vo7lBGo_p5n7hVG4g=',
    google_client_id: '432745930633-vc668ls5qi0bf9lit9sp5fhnf18vka8l.apps.googleusercontent.com',
  },
};

// export const environment = environments['local'];
// export const environment = environments['test'];
// export const environment = environments['staging'];
export const environment = environments['production'];
