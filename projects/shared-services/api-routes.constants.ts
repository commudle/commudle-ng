

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


  // question_types
  ALL_QUESTION_TYPES: '/api/v2/question_types'
};
