

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


  // event_data_form_entity_groups
  GET_EVENT_DATA_FORM_ENTITY_GROUPS: 'api/v2/event_data_form_entity_groups',
  CREATE_EVENT_DATA_FORM_ENTITY_GROUP: 'api/v2/event_data_form_entity_groups',



  // registration_types
  GET_REGISTRATION_TYPES: 'api/v2/registration_types',


  // data_form_entities
  UPDATE_DATA_FORM_ENTITY_VISIBILITY: 'api/v2/data_form_entities/update_visibility',


};
