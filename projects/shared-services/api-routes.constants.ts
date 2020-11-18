

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
    CREATE: 'api/v2/communities',
    USER_ROLE_COMMUNITIES: 'api/v2/communities/user_role_communities',
    DETAILS: 'api/v2/communities',
    UPDATE: 'api/v2/communities/update',
    SEARCH_BY_NAME: 'api/v2/communities/search_by_name',

    PUBLIC_INDEX: 'api/v2/communities/public_index',
    PUBLIC_DETAILS: 'api/v2/communities/public_show'
  },

  // community_builds
  COMMUNITY_BUILDS: {
    INDEX: 'api/v2/community_builds',
    SHOW: 'api/v2/community_builds/show',
    CREATE: 'api/v2/community_builds',
    UPDATE: 'api/v2/community_builds',
    DELETE: 'api/v2/community_builds',
    UPDATE_TAGS: 'api/v2/community_builds/update_tags',
    UPDATE_PUBLISH_STATUS: 'api/v2/community_builds/update_publish_status',

    PUBLIC: {
      INDEX: 'api/v2/community_builds/public',
      SHOW: 'api/v2/community_builds/public/show',
      TOGGLE_VOTE: 'api/v2/community_builds/public/toggle_vote',
    }
  },

  COMMUNITY_CHANNELS: {
    INDEX: 'api/v2/community_channels',
    CREATE: 'api/v2/community_channels',
    UPDATE: 'api/v2/community_channels',
    DELETE: 'api/v2/community_channels'
  },

  COMMUNITY_GROUPS: {
    CREATE: 'api/v2/community_groups',
    UPDATE: 'api/v2/community_groups',
    SHOW: 'api/v2/community_groups/show',
    COMMUNITIES: 'api/v2/community_groups/communities',
    MANAGING_COMMUNITY_GROUPS: 'api/v2/community_groups/get_managing_community_groups',

    PUBLIC: {
      SHOW: 'api/v2/community_groups/public',
      COMMUNITIES: 'api/v2/community_groups/public/communities',
    }
  },



  // data_forms
  COMMUNITY_DATA_FORMS: 'api/v2/data_forms/community_data_forms',
  GET_DATA_FORM: 'api/v2/data_forms',
  CREATE_DATA_FORM: 'api/v2/data_forms',
  UPDATE_DATA_FORM: 'api/v2/data_forms',
  CLONE_COMMUNITY_DATA_FORM: 'api/v2/data_forms/clone_community_data_form',


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
    UPDATE_HEADER_IMAGE: 'api/v2/events/update_header_image',
    DELETE_HEADER_IMAGE: 'api/v2/events/delete_header_image',


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
    EMAIL_CSV: 'api/v2/event_data_form_entity_groups/email_csv',
    CHANGE_BULK_REGISTRATION_STATUS: 'api/v2/event_data_form_entity_groups/change_bulk_registration_status',

    PUBLIC_OPEN_DATA_FORMS: 'api/v2/event_data_form_entity_groups/public_open_data_forms'
  },

  // event_simple_registrations
  EVENT_SIMPLE_REGISTATIONS: {
    FIND_OR_CREATE: 'api/v2/event_simple_registrations/find_or_create',
    TOGGLE_STATUS: 'api/v2/event_simple_registrations/toggle_status',
    EMAIL_CSV: 'api/v2/event_simple_registrations/email_csv',
    CHANGE_BULK_REGISTRATION_STATUS: 'api/v2/event_simple_registrations/change_bulk_registration_status',
    PUBLIC: {
      SHOW: 'api/v2/event_simple_registrations/public_show',
    }
  },


  EVENT_SPONSORS: {
    CREATE: 'api/v2/event_sponsors',
    INDEX: 'api/v2/event_sponsors',
    EXISTING_SPONSORS: 'api/v2/event_sponsors/get_existing',
    ADD_EXISTING_SPONSOR: 'api/v2/event_sponsors/add_existing_sponsor',
    DESTROY: 'api/v2/event_sponsors',

    PUBLIC: {
      INDEX: 'api/v2/event_sponsors/public'
    }
  },




  // registration_types
  GET_REGISTRATION_TYPES: 'api/v2/registration_types',


  // data_form_entities
  DATA_FORM_ENTITIES: {
    INDEX: 'api/v2/data_form_entities/get_form_entities',
    SHOW: 'api/v2/data_form_entities',
    UPDATE_VISIBILITY: 'api/v2/data_form_entities/update_visibility',
    EMAIL_CSV: 'api/v2/data_form_entities/email_csv',
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
    PUBLIC_EVENT_INTERESTED_USERS: 'api/v2/data_form_entity_response_groups/public_event_interested_users'
  },


  // event_entry_passes

  EVENT_ENTRY_PASSES: {
    CREATE_EVENT_ENTRY_PASS: 'api/v2/event_entry_passes',
    CREATE_USER_EVENT_REGISTRATION_ENTRY_PASS: 'api/v2/event_entry_passes/user_event_registration_entry_pass',
    TOGGLE_ATTENDANCE: 'api/v2/event_entry_passes/toggle_attendance',
    TOGGLE_UNINVITED: 'api/v2/event_entry_passes/toggle_uninvited',
    AUTO_ONLINE_ATTENDANCE: 'api/v2/event_entry_passes/auto_online_attendance'
  },


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

  HOME: {
    PUBLIC: {
      UPCOMING_EVENTS: 'api/v2/home/public/upcoming_events',
      PAST_RANDOM_EVENTS: 'api/v2/home/public/past_random_events',
      LABS: 'api/v2/home/public/labs',
      COMMUNITY_BUILDS: 'api/v2/home/public/community_builds',
      COMMUNITIES: 'api/v2/home/public/communities',
    }

  },



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
    GET_ADMIN_COMMUNITY_GROUP_USERS: 'api/v2/user_roles_users/get_admin_community_group_users',
    COMMUNITY_MEMBERS: 'api/v2/user_roles_users/community_members',
    CREATE: 'api/v2/user_roles_users/',
    DELETE: 'api/v2/user_roles_users/',
    RESEND_INVITATION: 'api/v2/user_roles_users/resend_invitation',
    ACTIVATE_COMMUNITY_ROLE: 'api/v2/user_roles_users/activate_community_role',
    GET_EVENT_VOLUNTEERS: 'api/v2/user_roles_users/get_event_volunteers',

    PUBLIC_GET_COMMUNITY_LEADERS_BY_ROLE: 'api/v2/user_roles_users/public_get_community_leaders_by_role',
    PUBLIC_GET_COMMUNITY_MEMBERS: 'api/v2/user_roles_users/public_community_members',
    PUBLIC_GET_ADMIN_COMMUNITY_GROUP_USERS: 'api/v2/user_roles_users/public_get_admin_community_group_users',
    PUBLIC_CHECK_MEMBERSHIP: 'api/v2/user_roles_users/public_check_membership',
    PUBLIC_TOGGLE_MEMBERSHIP: 'api/v2/user_roles_users/public_toggle_membership'
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
    GET_PERSONAL_CHATS: 'api/v2/discussions/get_personal_chats',
    GET_OR_CREATE_PERSONAL_CHAT: 'api/v2/discussions/get_or_create_personal_chat',
    GET_PERSONAL_CHAT: 'api/v2/discussions/get_personal_chat',
    PUBLIC_GET_OR_CREATE_QNA_FOR_TRACK_SLOT: 'api/v2/discussions/public_get_or_create_qna_for_track_slot',
    PUBLIC_GET_OR_CREATE_CHAT_FOR_TRACK_SLOT: 'api/v2/discussions/public_get_or_create_for_track_slot_chat',
    PUBLIC_GET_OR_CREATE_QNA_FOR_EVENT: 'api/v2/discussions/public_get_or_create_qna_for_event',
    PUBLIC_GET_OR_CREATE_FOR_EVENT_CHAT: 'api/v2/discussions/public_get_or_create_for_event_chat',
    PUBLIC_GET_OR_CREATE_FOR_COMMUNITY_BUILD_CHAT: 'api/v2/discussions/public_get_or_create_for_community_build_chat',
    PUBLIC_GET_OR_CREATE_FOR_LAB_CHAT: 'api/v2/discussions/public_get_or_create_for_lab_chat'
  },

  LABS: {
    INDEX: 'api/v2/labs',
    CREATE: 'api/v2/labs',
    UPDATE: 'api/v2/labs/update',
    SHOW: 'api/v2/labs/show',
    UPLOAD_HEADER_IMAGE: 'api/v2/labs/upload_header_image',
    DELETE_HEADER_IMAGE: 'api/v2/labs/delete_header_image',
    UPDATE_TAGS: 'api/v2/labs/update_tags',
    UPLOAD_TEXT_IMAGE: 'api/v2/labs/upload_text_image',
    DELETE: 'api/v2/labs',
    UPDATE_PUBLISH_STATUS: 'api/v2/labs/update_publish_status',
    ADD_LAB_STEP_VISIT: 'api/v2/labs/add_lab_step_visit',

    PUBLIC: {
      SHOW: 'api/v2/labs/public/show',
      TAGS: 'api/v2/labs/public/tags',
      INDEX: 'api/v2/labs/public'
    }
  },


  USER_EVENT_REGISTRATIONS: {
    INDEX: 'api/v2/user_event_registrations',
    UPDATE_REGISTRATION_STATUS: 'api/v2/user_event_registrations/update_registration_status',
    INVITE_AS_SPEAKER: 'api/v2/user_event_registrations/invite_as_speaker',
    SPEAKERS: 'api/v2/user_event_registrations/speakers',
    REMOVE_SPEAKER: 'api/v2/user_event_registrations/remove_speaker',
    RESEND_SPEAKER_INVITATION: 'api/v2/user_event_registrations/resend_speaker_invitation',

    PUBLIC: {
      SHOW: 'api/v2/user_event_registrations/public_show',
      TOGGLE: 'api/v2/user_event_registrations/public_toggle',
      INTERESTED_MEMBERS: 'api/v2/user_event_registrations/public_event_interested_users',
      SPEAKERS: 'api/v2/user_event_registrations/public_speakers',
    }
  },

  USER_MESSAGES: {
    PERSONAL_CHAT_DISCUSSION_MESSAGES: 'api/v2/user_messages/personal_chat_discussion_messages',
    PUBLIC_TRACK_SLOT_DISCUSSION_MESSAGES: 'api/v2/user_messages/track_slot_discussion_messages',
    PUBLIC_DISCUSSION_CHAT_MESSAGES: 'api/v2/user_messages/public_discussion_chat_messages',
  },

  USER_OBJECT_VISITS: {
    CREATE: 'api/v2/user_object_visits',
    MARK_END_TIME: 'api/v2/user_object_visits/mark_end_time',

  },


  VOTES: {
    PUBLIC: {
      COUNT: 'api/v2/votes/public/count',
      VOTERS: 'api/v2/votes/public/voters'
    }
  },


  EXTERNAL: {
    GITHUB_API: 'https://api.github.com/repos/commudle/commudle-ng',
    GITHUB_REPO: 'https://github.com/commudle/commudle-ng'
  },


  STATS: {

    EVENTS: {
      UNIQUE_VISITORS: 'api/v2/stats/events/unique_visitors',
      CUSTOM_REGISTRATION: 'api/v2/stats/events/custom_registration',
      SIMPLE_EVENT_REGISTRATION: 'api/v2/stats/events/simple_event_registration',
      ATTENDEES: 'api/v2/stats/events/attendees',
      DISCUSSIONS: 'api/v2/stats/events/discussions',
      POLLS: 'api/v2/stats/events/polls'
    },

    COMMUNITIES: {
      MEMBERS_DISTRIBUTION: 'api/v2/stats/communities/members_distribution',
      MEMBERS_TIMELINE: 'api/v2/stats/communities/members_timeline',
      EVENTS_TIMELINE: 'api/v2/stats/communities/events_timeline',
      EMAILS: 'api/v2/stats/communities/emails',
    },

    LABS: {
      USER_ENGAGEMENT: 'api/v2/stats/labs/user_engagement',
    },


    COMMUNITY_BUILDS: {
      USER_ENGAGEMENT: 'api/v2/stats/community_builds/user_engagement',
    },
  }

};
