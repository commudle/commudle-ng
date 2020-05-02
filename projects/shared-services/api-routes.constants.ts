

export const API_ROUTES = {
  VERIFY_AUTHENTICATION: 'api/v2/token_authentication/verify_authentication',
  LOGOUT: 'api/v2/token_authentication/logout',
  CURRENT_USER: 'api/v2/users/signed_in_user',


  // communities
  USER_ROLE_COMMUNITIES: 'api/v2/communities/user_role_communities',
  COMMUNITY_DETAILS: 'api/v2/communities',
  UPDATE_COMMUNITY: 'api/v2/communities/update',



  // data_forms
  COMMUNITY_DATA_FORMS: 'api/v2/data_forms/community_data_forms',
  GET_DATA_FORM: 'api/v2/data_forms',
  CREATE_DATA_FORM: 'api/v2/data_forms',
  UPDATE_DATA_FORM: 'api/v2/data_forms',


  // question_types
  ALL_QUESTION_TYPES: 'api/v2/question_types',


  // events
  CREATE_EVENT: 'api/v2/events',
  UPDATE_EVENT: 'api/v2/events',
  GET_EVENT: 'api/v2/events',
  COMMUNITY_EVENTS_FOR_EMAIL: 'api/v2/events/community_events_for_email',


  // event_data_form_entity_groups
  GET_EVENT_DATA_FORM_ENTITY_GROUPS: 'api/v2/event_data_form_entity_groups',
  GET_EVENT_DATA_FORM_ENTITY_GROUP: 'api/v2/event_data_form_entity_group',
  CREATE_EVENT_DATA_FORM_ENTITY_GROUP: 'api/v2/event_data_form_entity_groups',



  // registration_types
  GET_REGISTRATION_TYPES: 'api/v2/registration_types',


  // data_form_entities
  UPDATE_DATA_FORM_ENTITY_VISIBILITY: 'api/v2/data_form_entities/update_visibility',


  // registration_statuses
  GET_REGISTRATION_STATUSES: 'api/v2/registration_statuses',


  // data_form_entity_response_groups
  GET_EVENT_DATA_FORM_RESPONSES: 'api/v2/data_form_entity_response_groups/event_data_form_responses',
  UPDATE_EVENT_REGISTRATION_STATUS: 'api/v2/data_form_entity_response_groups/update_event_registration_status',
  GET_EVENT_SPEAKERS: 'api/v2/data_form_entity_response_groups/event_speakers',

  // event_entry_passes
  CREATE_EVENT_ENTRY_PASS: 'api/v2/event_entry_passes',
  TOGGLE_ATTENDANCE: 'api/v2/event_entry_passes/toggle_attendance',
  TOGGLE_UNINVITED: 'api/v2/event_entry_passes/toggle_uninvited',


  // locations
  GET_LOCATIONS: 'api/v2/locations',


  // event_locations
  GET_EVENT_LOCATIONS: 'api/v2/event_locations',
  CREATE_EVENT_LOCATION: 'api/v2/event_locations',
  UPDATE_EVENT_LOCATION: 'api/v2/event_locations',
  DELETE_EVENT_LOCATION: 'api/v2/event_locations',

  // event_location_track
  CREATE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',
  UPDATE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',
  DELETE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',


  // track_slots
  CREATE_TRACK_SLOT: 'api/v2/track_slots',
  UPDATE_TRACK_SLOT: 'api/v2/track_slots',
  DELETE_TRACK_SLOT: 'api/v2/track_slots',


  // communication_mailers
  SEND_COMMUNITY_EMAILS: 'api/v2/communication_mailers/community_emails',

  // user_roles_users
  GET_ADMIN_COMMUNITY_USERS_BY_ROLE: 'api/v2/user_roles_users/get_admin_community_users_by_role',
  CREATE_USER_ROLES_USER: 'api/v2/user_roles_users/',
  DELETE_USER_ROLES_USER: 'api/v2/user_roles_users/',
  RESEND_USER_ROLES_USER_INVITATION: 'api/v2/user_roles_users/resend_invitation',

  // event_collaboration_communities
  EVENT_COLLABORATION_COMMUNITIES: {
    INDEX: 'api/v2/event_collaboration_communities',
    CREATE: 'api/v2/event_collaboration_communities',
    DELETE: 'api/v2/event_collaboration_communities',
    RESEND_INVITATION: 'api/v2/event_collaboration_communities/resend_invitation',
    CONFIRM: 'api/v2/event_collaboration_communities/confirm',
  }
};
