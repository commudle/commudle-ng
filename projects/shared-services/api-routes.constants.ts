

export const API_ROUTES = {
  VERIFY_AUTHENTICATION: 'api/v2/token_authentication/verify_authentication',
  LOGOUT: 'api/v2/token_authentication/logout',
  CURRENT_USER: 'api/v2/users/signed_in_user',


  // admin_surveys
  ADMIN_SURVEYS: {
    INDEX: 'api/v2/admin_surveys'
  },

  // communities
  COMMUNITIES: {
    USER_ROLE_COMMUNITIES: 'api/v2/communities/user_role_communities',
    DETAILS: 'api/v2/communities',
    UPDATE: 'api/v2/communities/update',
    SEARCH_BY_NAME: 'api/v2/communities/search_by_name',

    PUBLIC_INDEX: 'api/v2/communities/public_index',
    PUBLIC_DETAILS: 'api/v2/communities/public_show'
  },



  // data_forms
  COMMUNITY_DATA_FORMS: 'api/v2/data_forms/community_data_forms',
  GET_DATA_FORM: 'api/v2/data_forms',
  CREATE_DATA_FORM: 'api/v2/data_forms',
  UPDATE_DATA_FORM: 'api/v2/data_forms',


  // question_types
  ALL_QUESTION_TYPES: 'api/v2/question_types',

  // embedded_video_streams
  EMBEDDED_VIDEO_STREAMS: {
    GET: 'api/v2/embedded_video_streams',
    CREATE_UPDATE_FOR_EVENT: 'api/v2/embedded_video_streams/create_update_for_event',

    PUBLIC: {
      GET: 'api/v2/embedded_video_streams/public'
    }
  },

  // events
  EVENTS: {
    CREATE: 'api/v2/events',
    UPDATE: 'api/v2/events',
    GET: 'api/v2/events',
    COMMUNITY_EVENTS_FOR_EMAIL: 'api/v2/events/community_events_for_email',
    UPDATE_STATUS: 'api/v2/events/update_status',
    UPDATE_CUSTOM_REGISTRATION: 'api/v2/events/update_custom_registration',
    UPDATE_CUSTOM_AGENDA: 'api/v2/events/update_custom_agenda',

    PUBLIC: {
      GET: 'api/v2/events/public/show',
      VOLUNTEERS: 'api/v2/events/public/volunteers',
      INDEX_BY_COMMUNITY: 'api/v2/events/public/index_by_community',
      UPCOMING: 'api/v2/events/public/upcoming',
      RANDOM_PAST: 'api/v2/events/public/past_random'
    }
  },



  // event_data_form_entity_groups
  EVENT_DATA_FORM_ENTITY_GROUPS: {
    INDEX: 'api/v2/event_data_form_entity_groups',
    GET: 'api/v2/event_data_form_entity_group',
    CREATE: 'api/v2/event_data_form_entity_groups',
    DELETE: 'api/v2/event_data_form_entity_groups',
    UPDATE_RSVP: 'api/v2/event_data_form_entity_groups/update_rsvp',

    PUBLIC_OPEN_DATA_FORMS: 'api/v2/event_data_form_entity_groups/public_open_data_forms'
  },

  // event_simple_registrations
  EVENT_SIMPLE_REGISTATIONS: {
    FIND_OR_CREATE: 'api/v2/event_simple_registrations/find_or_create',
    TOGGLE_STATUS: 'api/v2/event_simple_registrations/toggle_status',

    PUBLIC: {
      SHOW: 'api/v2/event_simple_registrations/public_show',
    }
  },




  // registration_types
  GET_REGISTRATION_TYPES: 'api/v2/registration_types',


  // data_form_entities
  DATA_FORM_ENTITIES: {
    INDEX: 'api/v2/data_form_entities/get_form_entities',
    SHOW: 'api/v2/data_form_entities',
    UPDATE_VISIBILITY: 'api/v2/data_form_entities/update_visibility',
  },


  // registration_statuses
  GET_REGISTRATION_STATUSES: 'api/v2/registration_statuses',


  // data_form_entity_response_groups
  DATA_FORM_ENTITY_RESPONSE_GROUPS: {
    GET_EVENT_DATA_FORM_RESPONSES: 'api/v2/data_form_entity_response_groups/event_data_form_responses',
    UPDATE_EVENT_REGISTRATION_STATUS: 'api/v2/data_form_entity_response_groups/update_event_registration_status',
    GET_EVENT_SPEAKERS: 'api/v2/data_form_entity_response_groups/event_speakers',
    UPDATE_RSVP: 'api/v2/data_form_entity_response_groups/update_rsvp',
    DATA_FORM_ENTITY_RESPONSES: 'api/v2/data_form_entity_response_groups/data_form_entity_responses',

    PUBLIC_GET_EVENT_SPEAKERS: 'api/v2/data_form_entity_response_groups/public_event_speakers',
    PUBLIC_EVENT_INTERESTED_USERS: 'api/v2/data_form_entity_response_groups/data_form_entity_responses'
  },


  // event_entry_passes
  CREATE_EVENT_ENTRY_PASS: 'api/v2/event_entry_passes',
  CREATE_USER_EVENT_REGISTRATION_ENTRY_PASS: 'api/v2/event_entry_passes/user_event_registration_entry_pass',
  TOGGLE_ATTENDANCE: 'api/v2/event_entry_passes/toggle_attendance',
  TOGGLE_UNINVITED: 'api/v2/event_entry_passes/toggle_uninvited',


  // locations
  GET_LOCATIONS: 'api/v2/locations',


  // event_locations

  EVENT_LOCATIONS: {
    GET: 'api/v2/event_locations',
    CREATE: 'api/v2/event_locations',
    UPDATE: 'api/v2/event_locations',
    DELETE: 'api/v2/event_locations',

    PUBLIC_INDEX: 'api/v2/event_locations/public_index'
  },


  // event_location_track
  CREATE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',
  UPDATE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',
  DELETE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',


  POLLS: {
    PUBLIC: {
      SHOW: 'api/v2/polls/public',
      QUESTION_RESPONSE: 'api/v2/polls/public/question_responses'
    }
  },


  TRACK_SLOTS: {
    CREATE: 'api/v2/track_slots',
    UPDATE: 'api/v2/track_slots',
    DELETE: 'api/v2/track_slots',
    PUBLIC: {
      GET: 'api/v2/track_slots/public_show',
      TOGGLE_VOTE: 'api/v2/track_slots/public_toggle_vote',
      LIVE_EVENT_SESSIONS: 'api/v2/track_slots/public_live_event_sessions'
    }
  },


  // communication_mailers
  SEND_COMMUNITY_EMAILS: 'api/v2/communication_mailers/community_emails',

  // user_roles_users
  USER_ROLES_USERS: {
    GET_ADMIN_COMMUNITY_USERS_BY_ROLE: 'api/v2/user_roles_users/get_admin_community_users_by_role',
    CREATE: 'api/v2/user_roles_users/',
    DELETE: 'api/v2/user_roles_users/',
    RESEND_INVITATION: 'api/v2/user_roles_users/resend_invitation',
    ACTIVATE_COMMUNITY_ROLE: 'api/v2/user_roles_users/activate_community_role',

    PUBLIC_GET_COMMUNITY_LEADERS_BY_ROLE: 'api/v2/user_roles_users/public_get_community_leaders_by_role',
    PUBLIC_GET_COMMUNITY_MEMBERS: 'api/v2/user_roles_users/public_community_members'
  },

  // event_collaboration_communities
  EVENT_COLLABORATION_COMMUNITIES: {
    INDEX: 'api/v2/event_collaboration_communities',
    CREATE: 'api/v2/event_collaboration_communities',
    DELETE: 'api/v2/event_collaboration_communities',
    RESEND_INVITATION: 'api/v2/event_collaboration_communities/resend_invitation',
    CONFIRM: 'api/v2/event_collaboration_communities/confirm',

    PUBLIC_INDEX: 'api/v2/event_collaboration_communities/public_index'
  },


  EVENT_UPDATES: {
    INDEX: 'api/v2/event_updates',
    CREATE: 'api/v2/event_updates',
    DELETE: 'api/v2/event_updates',
    PUBLIC_INDEX: 'api/v2/event_updates/public_index'
  },


  DATA_FORM_ENTITY_RESPONSES: {
    EXISTING_RESPONSES: 'api/v2/data_form_entity_responses/existing_response',
    SUBMIT_FORM_RESPONSE: 'api/v2/data_form_entity_responses/submit_form_response'
  },

  USERS: {
    UPDATE_PROFILE: 'api/v2/users/update_profile'
  },

  SPEAKER_RESOURCES: {
    SHOW_BY_TOKEN: 'api/v2/speaker_resources/show_by_token',
    CREATE_OR_UPDATE_BY_TOKEN: 'api/v2/speaker_resources/create_or_update_by_token',

    PUBLIC: {
      COMMUNITY_RESOURCES: 'api/v2/speaker_resources/public_community_sessions'
    }
  },

  DISCUSSIONS: {
    PUBLIC_GET_OR_CREATE_QNA_FOR_TRACK_SLOT: 'api/v2/discussions/public_get_or_create_qna_for_track_slot',
    PUBLIC_GET_OR_CREATE_QNA_FOR_EVENT: 'api/v2/discussions/public_get_or_create_qna_for_event',
    PUBLIC_GET_OR_CREATE_FOR_EVENT_CHAT: 'api/v2/discussions/public_get_or_create_for_event_chat'
  },


  USER_EVENT_REGISTRATIONS: {
    INDEX: 'api/v2/user_event_registrations',
    UPDATE_REGISTRATION_STATUS: 'api/v2/user_event_registrations/update_registration_status',


    PUBLIC: {
      SHOW: 'api/v2/user_event_registrations/public_show',
      TOGGLE: 'api/v2/user_event_registrations/public_toggle',
      INTERESTED_MEMBERS: 'api/v2/user_event_registrations/public_event_interested_users'
    }
  },

  USER_MESSAGES: {
    PUBLIC_TRACK_SLOT_DISCUSSION_MESSAGES: 'api/v2/user_messages/track_slot_discussion_messages',
    PUBLIC_DISCUSSION_CHAT_MESSAGES: 'api/v2/user_messages/public_discussion_chat_messages',

  },


  EXTERNAL: {
    GITHUB_API: 'https://api.github.com/repos/commudle/commudle-ng',
    GITHUB_REPO: 'https://github.com/commudle/commudle-ng'
  }

};
