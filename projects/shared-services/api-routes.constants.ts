

export const API_ROUTES = {
  VERIFY_AUTHENTICATION: 'api/v2/token_authentication/verify_authentication',
  LOGOUT: 'api/v2/token_authentication/logout',
  CURRENT_USER: 'api/v2/users/signed_in_user',


  // communities

  COMMUNITIES: {
    USER_ROLE_COMMUNITIES: 'api/v2/communities/user_role_communities',
    DETAILS: 'api/v2/communities',
    UPDATE: 'api/v2/communities/update',
    SEARCH_BY_NAME: 'api/v2/communities/search_by_name'
  },



  // data_forms
  COMMUNITY_DATA_FORMS: 'api/v2/data_forms/community_data_forms',
  GET_DATA_FORM: 'api/v2/data_forms',
  CREATE_DATA_FORM: 'api/v2/data_forms',
  UPDATE_DATA_FORM: 'api/v2/data_forms',


  // question_types
  ALL_QUESTION_TYPES: 'api/v2/question_types',


  // events
  EVENTS: {
    CREATE: 'api/v2/events',
    UPDATE: 'api/v2/events',
    GET: 'api/v2/events',
    COMMUNITY_EVENTS_FOR_EMAIL: 'api/v2/events/community_events_for_email',
    UPDATE_STATUS: 'api/v2/events/update_status',

    PUBLIC: {
      GET: 'api/v2/events/public_show',
      VOLUNTEERS: 'api/v2/events/public_volunteers'
    }
  },



  // event_data_form_entity_groups
  EVENT_DATA_FORM_ENTITY_GROUPS: {
    INDEX: 'api/v2/event_data_form_entity_groups',
    GET: 'api/v2/event_data_form_entity_group',
    CREATE: 'api/v2/event_data_form_entity_groups',
    DELETE: 'api/v2/event_data_form_entity_groups',
    UPDATE_RSVP: 'api/v2/event_data_form_entity_groups/update_rsvp'
  },




  // registration_types
  GET_REGISTRATION_TYPES: 'api/v2/registration_types',


  // data_form_entities
  DATA_FORM_ENTITIES: {
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

    PUBLIC_GET_EVENT_SPEAKERS: 'api/v2/data_form_entity_response_groups/public_event_speakers'
  },


  // event_entry_passes
  CREATE_EVENT_ENTRY_PASS: 'api/v2/event_entry_passes',
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

  TRACK_SLOTS: {
    CREATE: 'api/v2/track_slots',
    UPDATE: 'api/v2/track_slots',
    DELETE: 'api/v2/track_slots',
    PUBLIC: {
      GET: 'api/v2/track_slots/public_show',
      TOGGLE_VOTE: 'api/v2/track_slots/public_toggle_vote'
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
    ACTIVATE_COMMUNITY_ROLE: 'api/v2/user_roles_users/activate_community_role'
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
    CREATE_OR_UPDATE_BY_TOKEN: 'api/v2/speaker_resources/create_or_update_by_token'
  },

  DISCUSSIONS: {
    GET_OR_CREATE_BY_TRACK_SLOT: 'api/v2/discussions/get_or_create_by_track_slot'
  },


  USER_MESSAGES: {
    TRACK_SLOT_DISCUSSION_MESSAGES: 'api/v2/user_messages/track_slot_discussion_messages'
  }
};
