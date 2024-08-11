export const API_ROUTES = {
  VERIFY_AND_LOGIN: 'api/v2/token_authentication/verify_and_login',
  VERIFY_AUTHENTICATION: 'api/v2/token_authentication/verify_authentication',
  LOGOUT: 'api/v2/token_authentication/logout',
  CURRENT_USER: 'api/v2/users/signed_in_user',

  EMAIL_CODE_AUTH: {
    CREATE: 'api/v2/verification_codes/',
    VERIFY: 'api/v2/verification_codes/verify',
  },

  // admin_surveys
  ADMIN_SURVEYS: {
    INDEX: 'api/v2/admin_surveys',
    TOGGLE_MULTI_RESPONSE: 'api/v2/admin_surveys/toggle_multi_response',
    UPDATE_STATUS: 'api/v2/admin_surveys/update_status',
  },
  SURVEYS: {
    INDEX: 'api/v2/surveys',
    CREATE: 'api/v2/surveys',
    TOGGLE_MULTI_RESPONSE: 'api/v2/surveys/toggle_multi_response',
    UPDATE_STATUS: 'api/v2/surveys/update_status',
  },

  // communities
  COMMUNITIES: {
    CREATE: 'api/v2/communities',
    USER_ROLE_COMMUNITIES: 'api/v2/communities/user_role_communities',
    DETAILS: 'api/v2/communities',
    UPDATE: 'api/v2/communities/update',
    SEARCH_BY_NAME: 'api/v2/communities/search_by_name',
    // SEARCH: 'api/v2/communities/search',    //DEPRECATED
    SPEAKERS: 'api/v2/communities/speakers',
    POPULAR_TAGS: 'api/v2/communities/popular_tags',
    PUBLIC_INDEX: 'api/v2/communities/public_index',
    PUBLIC_DETAILS: 'api/v2/communities/public_show',
    TOGGLE_EMAIL_VISIBILITY: 'api/v2/communities/toggle_email_visibility',
    TOGGLE_PAYMENTS: 'api/v2/communities/toggle_payments',
    CSV_SPEAKERS_LIST: 'api/v2/communities/csv_speakers_list',
    PUBLIC: {
      INDEX: 'api/v2/communities/public',
      SPEAKERS: 'api/v2/communities/public/speakers',
    },
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
    CONFIRM_TEAMMATE_INVITE: 'api/v2/community_builds/confirm_teammate_invite',
    RESEND_TEAMMATE_INVITE: 'api/v2/community_builds/resend_teammate_invite',
    REMOVE_TEAMMATE: 'api/v2/community_builds/remove_teammate',
    PUBLIC: {
      // INDEX: 'api/v2/community_builds/public', //DEPRECATED
      INDEX: 'api/v2/community_builds/public/index',
      FEATURED_ITEMS: 'api/v2/featured_items/public',
      SHOW: 'api/v2/community_builds/public/show',
      TOGGLE_VOTE: 'api/v2/community_builds/public/toggle_vote',
      TOP_BUILDERS: 'api/v2/community_builds/public/top_builders',
    },
  },

  // Feeds
  EXTERNAL_FEEDS: {
    INDEX: 'api/v2/feed_items',
    SHOW: 'api/v2/feed_items/show',
    POPULAR_TAGS: 'api/v2/feed_items/popular_tags',
    TAGS_POST: 'api/v2/feed_items/tag_feed',
    POPULAR_POST: 'api/v2/feed_items/popular',
  },

  COMMUNITY_CHANNELS: {
    USER_CHANNEL_COMMUNITIES: 'api/v2/community_channels/user_channel_communities',
    INDEX: 'api/v2/community_channels',
    CREATE: 'api/v2/community_channels',
    SHOW: 'api/v2/community_channels/show',
    UPDATE: 'api/v2/community_channels',
    DELETE: 'api/v2/community_channels',
    JOIN_TOKEN: 'api/v2/community_channels/join_token',
    RESET_JOIN_TOKEN: 'api/v2/community_channels/reset_join_token',
    TAGGABLE_USERS: 'api/v2/community_channels/taggable_users',
    DELETE_LOGO: 'api/v2/community_channels/delete_logo',
    JOIN_CHANNEL: 'api/v2/community_channels/join_channel',
    DISCUSSION_MESSAGES: 'api/v2/community_channels/discussion_messages',
    DISCUSSION_MESSAGES_SCROLL: 'api/v2/community_channels/discussion_messages_paginated',
    SEND_MESSAGE_BY_EMAIL_TO_ALL_MEMBERS: 'api/v2/community_channels/send_message_by_email_to_all_members',
    GET_DEFAULT_CHANNEL: 'api/v2/community_channels/get_default_channel',
    GET_CHANNEL_ADMINS: 'api/v2/community_channels/get_channel_admins',
    MEMBERS: {
      INDEX: 'api/v2/community_channels/members',
      INVITE: 'api/v2/community_channels/members/invite',
      JOIN_BY_TOKEN: 'api/v2/community_channels/members/join_by_token',
      TOGGLE_ADMIN: 'api/v2/community_channels/members/toggle_admin',
      REMOVE: 'api/v2/community_channels/members/remove',
      EXIT_CHANNEL: 'api/v2/community_channels/members/exit_channel',
    },
    PINNING_MESSAGES: {
      PIN: 'api/v2/community_channels/pin_message',
      UNPIN: 'api/v2/community_channels/unpin_message',
      PINNED_MESSAGES: 'api/v2/community_channels/pinned_messages',
    },
    SHOW_BY_TOKEN: 'api/v2/community_channels/show_by_token',
  },

  COMMUNITY_GROUPS: {
    CREATE: 'api/v2/community_groups',
    UPDATE: 'api/v2/community_groups',
    SHOW: 'api/v2/community_groups/show',
    COMMUNITIES: 'api/v2/community_groups/communities',
    MANAGING_COMMUNITY_GROUPS: 'api/v2/community_groups/get_managing_community_groups',
    EVENTS: 'api/v2/community_groups/events',
    COMMUNITY_CHANNELS: 'api/v2/community_groups/community_channels',
    MEMEBRS_DETAILS: 'api/v2/community_groups/members_details',
    PUBLIC: {
      SHOW: 'api/v2/community_groups/public',
      COMMUNITIES: 'api/v2/community_groups/public/communities',
      EVENTS: 'api/v2/community_groups/public/events',
      COMMUNITY_CHANNELS: 'api/v2/community_groups/public/community_channels',
      ACTIVE_COMMUNITIES_AND_CHANNELS: 'api/v2/community_groups/public/active_communities_and_channels',
      ORGANIZERS_ALL_COMMUNITIES: 'api/v2/community_groups/public/organizers_all_communities',
    },
  },

  DATA_FORM_ENTITY_RESPONSES: {
    EXISTING_RESPONSES: 'api/v2/data_form_entity_responses/existing_response',
    SUBMIT_FORM_RESPONSE: 'api/v2/data_form_entity_responses/submit_form_response',
  },

  // data_forms
  COMMUNITY_DATA_FORMS: 'api/v2/data_forms/community_data_forms',
  GET_DATA_FORM: 'api/v2/data_forms',
  CREATE_DATA_FORM: 'api/v2/data_forms',
  UPDATE_DATA_FORM: 'api/v2/data_forms',
  CLONE_COMMUNITY_DATA_FORM: 'api/v2/data_forms/clone_community_data_form',
  LIST: 'api/v2/data_forms/list',

  // question_types
  ALL_QUESTION_TYPES: 'api/v2/question_types',

  // email unsubscribe groups
  EMAIL_UNSUBSCRIBE_GROUPS: {
    SHOW: 'api/v2/email_unsubscribe_groups/show',
    TOGGLE_USER_SUBSCRIPTION: 'api/v2/email_unsubscribe_groups/toggle_my_subscription',
  },

  // embedded_video_streams
  EMBEDDED_VIDEO_STREAMS: {
    GET: 'api/v2/embedded_video_streams',
    CREATE_UPDATE_FOR_EVENT: 'api/v2/embedded_video_streams/v2_create_update_for_event',
    RECORDING: {
      START: 'api/v2/embedded_video_streams/start_recording',
      STOP: 'api/v2/embedded_video_streams/stop_recording',
    },
    STREAMING: {
      START: 'api/v2/embedded_video_streams/start_streaming',
      STOP: 'api/v2/embedded_video_streams/stop_streaming',
    },
    PUBLIC: {
      GET: 'api/v2/embedded_video_streams/public',
    },
  },

  // events
  EVENTS: {
    CREATE: 'api/v2/events',
    UPDATE: 'api/v2/events',
    GET: 'api/v2/events',
    CLONE: 'api/v2/events/clone',
    COMMUNITY_EVENTS_FOR_EMAIL: 'api/v2/events/community_events_for_email',
    UPDATE_STATUS: 'api/v2/events/update_status',
    UPDATE_CUSTOM_REGISTRATION: 'api/v2/events/update_custom_registration',
    UPDATE_CUSTOM_AGENDA: 'api/v2/events/update_custom_agenda',
    UPDATE_HEADER_IMAGE: 'api/v2/events/update_header_image',
    DELETE_HEADER_IMAGE: 'api/v2/events/delete_header_image',
    EMBEDDED_VIDEO_STREAM_PAST_VISITORS: 'api/v2/events/embedded_video_stream_past_visitors',
    EMBEDDED_VIDEO_STREAM_VISITORS: 'api/v2/events/embedded_video_stream_visitors',
    INVITE_GUEST_TO_WEBINAR_STAGE: 'api/v2/events/invite_guest_to_webinar_stage',
    RECORDINGS: 'api/v2/events/recordings',
    ATTENDED_MEMBERS: 'api/v2/events/attended_members',
    ATTENDED_MEMBERS_NOTIFICATION: 'api/v2/events/create_attended_members_notification',
    COMMON_EVENTS: 'api/v2/events/common_events',
    IS_MEMBER_OF_ALL_COLLABORATING_COMMUNITIES: 'api/v2/events/is_member_of_all_collaborating_communities',
    PUBLIC: {
      EVENTS_LIST: 'api/v2/events/public',
      GET: 'api/v2/events/public/show',
      VOLUNTEERS: 'api/v2/events/public/volunteers',
      INDEX_BY_COMMUNITY: 'api/v2/events/public/index_by_community',
      UPCOMING: 'api/v2/events/public/upcoming',
      RANDOM_PAST: 'api/v2/events/public/past_random',
      POLLS: 'api/v2/events/public/polls',
      SPEAKERS_LIST: 'api/v2/events/public/speakers_list',
      TECH_SESSIONS: 'api/v2/events/public/tech_sessions',
      SOCIAL_RESOURCES: 'api/v2/events/public/social_resources',
      INTERESTED_MEMBERS: 'api/v2/events/public/interested_users',
    },
  },

  // event_data_form_entity_groups
  EVENT_DATA_FORM_ENTITY_GROUPS: {
    INDEX: 'api/v2/event_data_form_entity_groups',
    GET: 'api/v2/event_data_form_entity_group',
    CREATE: 'api/v2/event_data_form_entity_groups',
    UPDATE: 'api/v2/event_data_form_entity_groups',
    DELETE: 'api/v2/event_data_form_entity_groups',
    UPDATE_RSVP: 'api/v2/event_data_form_entity_groups/update_rsvp',
    EMAIL_CSV: 'api/v2/event_data_form_entity_groups/email_csv',
    CHANGE_BULK_REGISTRATION_STATUS: 'api/v2/event_data_form_entity_groups/change_bulk_registration_status',
    TOGGLE_IS_PAID: 'api/v2/event_data_form_entity_groups/toggle_is_paid',
    INDEX_BY_COMMUNITY: 'api/v2/event_data_form_entity_groups/index_by_community',
    LIST: 'api/v2/event_data_form_entity_groups/list',
    EMAIL_PAYMENT_DETAILS_CSV: 'api/v2/event_data_form_entity_groups/email_payment_details_csv',
    PUBLIC_OPEN_DATA_FORMS: 'api/v2/event_data_form_entity_groups/public_open_data_forms',
  },

  // event_simple_registrations
  EVENT_SIMPLE_REGISTRATIONS: {
    FIND_OR_CREATE: 'api/v2/event_simple_registrations/find_or_create',
    TOGGLE_STATUS: 'api/v2/event_simple_registrations/toggle_status',
    EMAIL_CSV: 'api/v2/event_simple_registrations/email_csv',
    CHANGE_BULK_REGISTRATION_STATUS: 'api/v2/event_simple_registrations/change_bulk_registration_status',
    PUBLIC: {
      SHOW: 'api/v2/event_simple_registrations/public_show',
    },
  },

  EVENT_SPONSORS: {
    CREATE: 'api/v2/event_sponsors',
    INDEX: 'api/v2/event_sponsors',
    EXISTING_SPONSORS: 'api/v2/event_sponsors/get_existing',
    ADD_EXISTING_SPONSOR: 'api/v2/event_sponsors/add_existing_sponsor',
    DESTROY: 'api/v2/event_sponsors',
    PUBLIC: {
      INDEX: 'api/v2/event_sponsors/public',
    },
  },

  FEATURED_COMMUNITIES: {
    INDEX: 'api/v2/featured_communities',
    SHOW: 'api/v2/featured_communities/show',
    CREATE: 'api/v2/featured_communities',
    UPDATE: 'api/v2/featured_communities',
    DELETE: 'api/v2/featured_communities',
    PUBLIC: {
      SHOW: 'api/v2/featured_communities/public/show',
    },
  },

  FEATURED_ITEMS: {
    INDEX: 'api/v2/featured_items',
    CREATE: 'api/v2/featured_items',
    UPDATE: 'api/v2/featured_items',
    DELETE: 'api/v2/featured_items',
    PUBLIC: {
      SHOW: 'api/v2/featured_items/public',
    },
  },

  // registration_types
  GET_REGISTRATION_TYPES: 'api/v2/registration_types',

  // data_form_entities
  DATA_FORM_ENTITIES: {
    INDEX: 'api/v2/data_form_entities/get_form_entities',
    SHOW: 'api/v2/data_form_entities',
    UPDATE_VISIBILITY: 'api/v2/data_form_entities/update_visibility',
    AUTOMATION: 'api/v2/data_form_entities/automation',
    FORM_STATUS: 'api/v2/data_form_entities/form_status',
    EMAIL_CSV: 'api/v2/data_form_entities/email_csv',
    CHECK_ALREADY_FILLED_ENTRY_PASS_FORM: 'api/v2/data_form_entities/check_already_filled_entry_pass_form',
  },

  // registration_statuses
  GET_REGISTRATION_STATUSES: 'api/v2/registration_statuses',

  //community_engagement_data
  GET_USER_COMMUNITY_ENGAGEMENT_DATA: 'api/v2/stats/user_communities/user_community_engagement',

  // data_form_entity_response_groups
  DATA_FORM_ENTITY_RESPONSE_GROUPS: {
    GET_EVENT_DATA_FORM_RESPONSES: 'api/v2/data_form_entity_response_groups/event_data_form_responses',
    UPDATE_EVENT_REGISTRATION_STATUS: 'api/v2/data_form_entity_response_groups/update_event_registration_status',
    GET_EVENT_SPEAKERS: 'api/v2/data_form_entity_response_groups/event_speakers',
    UPDATE_RSVP: 'api/v2/data_form_entity_response_groups/update_rsvp',
    DATA_FORM_ENTITY_RESPONSES: 'api/v2/data_form_entity_response_groups/data_form_entity_responses',
    PUBLIC_GET_EVENT_SPEAKERS: 'api/v2/data_form_entity_response_groups/public_event_speakers',
    PUBLIC_EVENT_INTERESTED_USERS: 'api/v2/data_form_entity_response_groups/public_event_interested_users',
    FILTERED_RESPONSE_VALUES: 'api/v2/data_form_entity_response_groups/filtered_response_values',
  },

  // event_entry_passes
  EVENT_ENTRY_PASSES: {
    CREATE_EVENT_ENTRY_PASS: 'api/v2/event_entry_passes',
    CREATE_USER_EVENT_REGISTRATION_ENTRY_PASS: 'api/v2/event_entry_passes/user_event_registration_entry_pass',
    TOGGLE_ATTENDANCE: 'api/v2/event_entry_passes/toggle_attendance',
    TOGGLE_UNINVITED: 'api/v2/event_entry_passes/toggle_uninvited',
    AUTO_ONLINE_ATTENDANCE: 'api/v2/event_entry_passes/auto_online_attendance',
    SHOW: 'api/v2/event_entry_passes/show',
    VERIFY_FILLED_EVENT_FORMS: 'api/v2/event_entry_passes/verify_filled_event_forms',
  },

  // locations
  GET_LOCATIONS: 'api/v2/locations',

  // hms_clients
  HMS_CLIENT: {
    CLIENT_TOKEN: 'api/v2/hms_clients/client_token/v2',
  },

  // event_locations
  EVENT_LOCATIONS: {
    GET: 'api/v2/event_locations',
    CREATE: 'api/v2/event_locations',
    UPDATE: 'api/v2/event_locations',
    DELETE: 'api/v2/event_locations',

    PUBLIC_INDEX: 'api/v2/event_locations/public_index',
  },

  // event_location_track
  CREATE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',
  UPDATE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',
  DELETE_EVENT_LOCATION_TRACK: 'api/v2/event_location_tracks',

  HOME: {
    LABS: 'api/v2/home/labs',
    COMMUNITIES: 'api/v2/home/communities',
    COMMUNITY_BUILDS: 'api/v2/home/community_builds',
    EXPERTS: 'api/v2/home/experts',
    SEARCH_ALL: 'api/v2/home/search_everything',
    PUBLIC: {
      UPCOMING_EVENTS: 'api/v2/home/public/upcoming_events',
      PAST_RANDOM_EVENTS: 'api/v2/home/public/past_random_events',
      LABS: 'api/v2/home/public/labs',
      COMMUNITY_BUILDS: 'api/v2/home/public/community_builds',
      COMMUNITIES: 'api/v2/home/public/communities',
    },
  },

  MAIN_NEWSLETTERS: {
    CREATE: 'api/v2/main_newsletters',
    SHOW: 'api/v2/main_newsletters',
    UPDATE: 'api/v2/main_newsletters',
    DELETE: 'api/v2/main_newsletters',
    UPDATE_STATUS: 'api/v2/main_newsletters/update_status',
    ATTACH_TEXT_IMAGE: 'api/v2/main_newsletters/attach_text_image',
    SET_SCHEDULE: 'api/v2/main_newsletters/set_schedule',
    RESET_SCHEDULE: 'api/v2/main_newsletters/reset_schedule',
    SEND_TEST_EMAIL: 'api/v2/main_newsletters/send_test_email',
    EMAIL_STATS: 'api/v2/main_newsletters/email_stats',
    ADMIN: {
      INDEX: 'api/v2/main_newsletters/admin',
    },
  },

  PUBLIC_NEWSLETTERS: {
    PUBLIC_INDEX: 'api/v2/main_newsletters/public_index',
  },

  PAGE_ADS: {
    INDEX: 'api/v2/pa',
    SHOW: 'api/v2/pa/show',
    CREATE: 'api/v2/pa',
    UPDATE: 'api/v2/pa',
    DELETE: 'api/v2/pa',
    PUBLIC: {
      SHOW: 'api/v2/pa/public/show',
    },
  },

  BADGES: {
    INDEX: 'api/v2/badges',
    SHOW: 'api/v2/badges/show',
    CREATE: 'api/v2/badges',
    UPDATE: 'api/v2/badges',
    DELETE: 'api/v2/badges',
  },
  STATIC_ASSETS: {
    SHOW: 'api/v2/static_assets',
    CREATE: 'api/v2/static_assets',
  },
  USER_BADGES: {
    INDEX: 'api/v2/user_badges',
    CREATE: 'api/v2/user_badges',
    DELETE: 'api/v2/user_badges',
  },

  POLLS: {
    PUBLIC: {
      SHOW: 'api/v2/polls/public',
      QUESTION_RESPONSE: 'api/v2/polls/public/question_responses',
    },
  },

  TRACK_SLOTS: {
    CREATE: 'api/v2/track_slots',
    UPDATE: 'api/v2/track_slots',
    DELETE: 'api/v2/track_slots',
    TRACK_SLOTS_BY_DATE: 'api/v2/track_slots/track_slots_by_date',
    TRACK_SLOTS_BY_DATE_AND_LOCATION: 'api/v2/track_slots/track_slot_by_date_and_location',
    PUBLIC: {
      GET: 'api/v2/track_slots/public_show',
      TOGGLE_VOTE: 'api/v2/track_slots/public_toggle_vote',
      LIVE_EVENT_SESSIONS: 'api/v2/track_slots/public_live_event_sessions',
      POLLS: 'api/v2/track_slots/public/polls',
      TRACK_SLOTS_BY_DATE: 'api/v2/track_slots/public/track_slots_by_date',
      TRACK_SLOTS_BY_DATE_AND_LOCATION: 'api/v2/track_slots/public/track_slot_by_date_and_location',
    },
  },

  // communication_mailers
  SEND_COMMUNITY_EMAILS: 'api/v2/communication_mailers/community_emails',

  SEARCH: {
    INDEX: 'api/v2/search',
    SCOPE: 'api/v2/search/scope',
  },

  // user_roles_users
  USER_ROLES_USERS: {
    GET_ADMIN_COMMUNITY_USERS_BY_ROLE: 'api/v2/user_roles_users/get_admin_community_users_by_role',
    GET_ADMIN_COMMUNITY_GROUP_USERS: 'api/v2/user_roles_users/get_admin_community_group_users',
    COMMUNITY_MEMBERS: 'api/v2/user_roles_users/community_members_details',
    CREATE: 'api/v2/user_roles_users/',
    DELETE: 'api/v2/user_roles_users/',
    RESEND_INVITATION: 'api/v2/user_roles_users/resend_invitation',
    ACTIVATE_COMMUNITY_ROLE: 'api/v2/user_roles_users/activate_community_role',
    GET_EVENT_VOLUNTEERS: 'api/v2/user_roles_users/get_event_volunteers',
    ROLE_DESIGNATIONS: 'api/v2/user_roles_users/role_designations',
    VERIFY_INVITATION_TOKEN: 'api/v2/user_roles_users/verify_invitation_token',

    COMMUNITY_BLOCKED_USERS: 'api/v2/user_roles_users/communities/blocked_users',
    REMOVE_USER: 'api/v2/user_roles_users/communities/remove_user',
    BLOCK_USER: 'api/v2/user_roles_users/communities/block_user',
    UNBLOCK_USER: 'api/v2/user_roles_users/communities/unblock_user',
    ROLES: 'api/v2/user_roles_users/communities/roles',

    PUBLIC_GET_COMMUNITY_LEADERS_BY_ROLE: 'api/v2/user_roles_users/public_get_community_leaders_by_role',
    PUBLIC_GET_COMMUNITY_MEMBERS: 'api/v2/user_roles_users/public_community_members',
    PUBLIC_GET_ADMIN_COMMUNITY_GROUP_USERS: 'api/v2/user_roles_users/public_get_admin_community_group_users',
    PUBLIC_CHECK_MEMBERSHIP: 'api/v2/user_roles_users/public_check_membership',
    PUBLIC_TOGGLE_MEMBERSHIP: 'api/v2/user_roles_users/public_toggle_membership',
  },

  // event_collaboration_communities
  EVENT_COLLABORATION_COMMUNITIES: {
    INDEX: 'api/v2/event_collaboration_communities',
    CREATE: 'api/v2/event_collaboration_communities',
    DELETE: 'api/v2/event_collaboration_communities',
    RESEND_INVITATION: 'api/v2/event_collaboration_communities/resend_invitation',
    CONFIRM: 'api/v2/event_collaboration_communities/confirm',
    PUBLIC_INDEX: 'api/v2/event_collaboration_communities/public_index',
  },

  EVENT_UPDATES: {
    INDEX: 'api/v2/event_updates',
    CREATE: 'api/v2/event_updates',
    DELETE: 'api/v2/event_updates',
    PUBLIC_INDEX: 'api/v2/event_updates/public_index',
  },

  POSTS: {
    PUBLIC_SHOW: 'api/v2/posts',
  },

  USERS: {
    GET_PROFILE: 'api/v2/users',
    UPDATE_PROFILE: 'api/v2/users/update_profile',
    CHECK_USERNAME: 'api/v2/users/check_username',
    SET_USERNAME: 'api/v2/users/set_username',
    GET_MY_ROLES: 'api/v2/users/get_my_roles',
    COMMUNITIES: 'api/v2/users/communities',
    MY_LABS: 'api/v2/users/my_labs',
    MY_COMMUNITY_BUILDS: 'api/v2/users/my_community_builds',
    LABS: 'api/v2/users/labs',
    COMMUNITY_BUILDS: 'api/v2/users/community_builds',
    BADGES: 'api/v2/users/badges',
    SPEAKER_RESOURCES: 'api/v2/users/speaker_resources',
    SPEAKER_SESSIONS_DELIVERED: 'api/v2/users/speaker_sessions_delivered',
    SOCIAL_RESOURCES: 'api/v2/users/social_resources',
    TOGGLE_FOLLOW: 'api/v2/users/toggle_follow',
    CHECK_FOLLOWEE: 'api/v2/users/check_followee',
    TAGS: 'api/v2/users/tags',
    PROFILE_BANNER_IMAGE: 'api/v2/users/profile_banner_image',
    POSTS: {
      INDEX: 'api/v2/users/posts',
      CREATE: 'api/v2/users/posts',
      DESTROY: 'api/v2/users/posts',
    },
    FOLLOWERS: 'api/v2/users/followers',
    FOLLOWEES: 'api/v2/users/followees',
    EMAIL_UNSUBSCRIBE_GROUPS: 'api/v2/users/email_unsubscribe_groups',
    MINI_PROFILE: 'api/v2/users/profile',
    TOGGLE_EMPLOYER_ROLE: 'api/v2/users/toggle_employer_role',
    TOGGLE_EMPLOYEE_ROLE: 'api/v2/users/toggle_employee_role',
    UPDATE_COMMUNICATION_PREFERENCES: 'api/v2/users/update_communication_consent',
    DEACTIVATE_PROFILE: 'api/v2/users/deactivate_profile',
    EVENTS_ATTENDED: 'api/v2/users/events_attended',
    PROFILE_STATS: 'api/v2/users/profile_stats',
    GET_USER_BY_EMAIL: 'api/v2/users/get_user_by_email',
  },

  SPEAKER_RESOURCES: {
    SHOW: 'api/v2/speaker_resources',
    SHOW_BY_TOKEN: 'api/v2/speaker_resources/show_by_token',
    CREATE_OR_UPDATE_BY_TOKEN: 'api/v2/speaker_resources/create_or_update_by_token',
    PUBLIC: {
      COMMUNITY_RESOURCES: 'api/v2/speaker_resources/public_community_sessions',
    },
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
    PUBLIC_GET_OR_CREATE_FOR_HACKATHON: 'api/v2/discussions/public_get_or_create_for_hackathon',
    PUBLIC_GET_OR_CREATE_FOR_LAB_CHAT: 'api/v2/discussions/public_get_or_create_for_lab_chat',
    PUBLIC_GET_OR_CREATE_FOR_SPEAKER_RESOURCE_CHAT: 'api/v2/discussions/public_get_or_create_for_speaker_resource_chat',
    PUBLIC_GET_OR_CREATE_FOR_FEED_ITEM_CHAT: 'api/v2/discussions/public_get_or_create_for_feed_item_chat',
    PUBLIC_GET_OR_CREATE_FOR_COMMUNITY_CHANNEL_CHAT:
      'api/v2/discussions/public_get_or_create_for_community_channel_chat',
    PUBLIC_COMMUNITY_BUILD_MESSAGES: 'api/v2/discussions/public_community_build_messages',
    TOGGLE_DISCUSSION_OPEN: 'api/v2/discussions/toggle_discussion_open',

    COMMUNITY_CHANNEL: {
      NEW_ATTACHMENT_MESSAGE: 'api/v2/discussions/community_channel/new_attachment_message',
      UPDATE_ATTACHMENT_MESSAGE: 'api/v2/discussions/community_channel/update_attachment_message',
    },
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
    ADD_LAB_STEP_VISIT: 'api/v2/labs/add_lab_step_visit',
    SIMILAR_LABS: 'api/v2/labs/similar_labs',
    PUBLIC: {
      SHOW: 'api/v2/labs/public/show',
      TAGS: 'api/v2/labs/public/tags',
      INDEX: 'api/v2/labs/public',
      GET_STEPS: 'api/v2/labs/public/steps',
      TOP_AUTHORS: 'api/v2/labs/public/top_authors',
    },
    ADMIN: {
      INDEX: 'api/v2/labs/admin',
      UPDATE_PUBLISH_STATUS: 'api/v2/labs/admin/update_publish_status',
    },
    SEARCH: {
      TAGS: 'api/v2/labs/search_tags',
      LABS_BY_TAGS: 'api/v2/labs',
    },
  },

  LINK_PREVIEWS: {
    CREATE: 'api/v2/link_previews',
  },

  SOCIAL_RESOURCES: {
    CREATE: 'api/v2/social_resources',
    UPDATE_DISPLAY_ORDER: 'api/v2/social_resources/update_display_order',
    DESTROY: 'api/v2/social_resources',
    PUBLIC: {
      INDEX: 'api/v2/social_resources/public',
    },
  },

  USER_EVENT_REGISTRATIONS: {
    INDEX: 'api/v2/user_event_registrations',
    UPDATE_REGISTRATION_STATUS: 'api/v2/user_event_registrations/update_registration_status',
    INVITE_AS_SPEAKER: 'api/v2/user_event_registrations/invite_as_speaker',
    SPEAKERS: 'api/v2/user_event_registrations/speakers',
    REMOVE_SPEAKER: 'api/v2/user_event_registrations/remove_speaker',
    RESEND_SPEAKER_INVITATION: 'api/v2/user_event_registrations/resend_speaker_invitation',
    UPDATE_RSVP: 'api/v2/user_event_registrations/update_rsvp',
    PUBLIC: {
      SHOW: 'api/v2/user_event_registrations/public_show',
      TOGGLE: 'api/v2/user_event_registrations/public_toggle',
      INTERESTED_MEMBERS: 'api/v2/user_event_registrations/public_event_interested_users',
      SPEAKERS: 'api/v2/user_event_registrations/public_speakers',
    },
  },

  USER_MESSAGES: {
    PERSONAL_CHAT_DISCUSSION_MESSAGES: 'api/v2/user_messages/personal_chat_discussion_messages',
    PUBLIC_TRACK_SLOT_DISCUSSION_MESSAGES: 'api/v2/user_messages/track_slot_discussion_messages',
    PUBLIC_DISCUSSION_CHAT_MESSAGES: 'api/v2/user_messages/public_discussion_chat_messages',
    PUBLIC_COMMUNITY_CHANNEL_DISCUSSION_MESSAGES: 'api/v2/user_messages/public_community_channel_discussion_messages',
  },

  USER_MESSAGE_RECEIPTS: {
    CREATE: 'api/v2/user_message_receipts',
  },

  USER_OBJECT_VISITS: {
    CREATE: 'api/v2/user_object_visits',
    MARK_END_TIME: 'api/v2/user_object_visits/mark_end_time',
  },

  VOTES: {
    PUBLIC: {
      COUNT: 'api/v2/votes/public/count',
      VOTERS: 'api/v2/votes/public/voters',
    },
  },

  FLAGS: {
    PUBLIC: {
      COUNT: 'api/v2/flags/public/count',
    },
  },

  EXTERNAL: {
    GITHUB_API: 'https://api.github.com/repos/commudle/commudle-ng',
    GITHUB_REPO: 'https://github.com/commudle/commudle-ng',
  },

  STATS: {
    EVENTS: {
      UNIQUE_VISITORS: 'api/v2/stats/events/unique_visitors',
      CUSTOM_REGISTRATION: 'api/v2/stats/events/custom_registration',
      SIMPLE_EVENT_REGISTRATION: 'api/v2/stats/events/simple_event_registration',
      ATTENDEES: 'api/v2/stats/events/attendees',
      DISCUSSIONS: 'api/v2/stats/events/discussions',
      POLLS: 'api/v2/stats/events/polls',
      SPEAKERS: 'api/v2/stats/events/speakers',
      MEMBER_STATS: 'api/v2/stats/events/member_stats',
    },
    COMMUNITIES: {
      MEMBERS_DISTRIBUTION: 'api/v2/stats/communities/members_distribution',
      MEMBERS_TIMELINE: 'api/v2/stats/communities/members_timeline',
      EVENTS_TIMELINE: 'api/v2/stats/communities/events_timeline',
      EMAILS: 'api/v2/stats/communities/emails',
      POPULAR_PROFILE_SKILL_TAGS: 'api/v2/stats/communities/popular_profile_skill_tags',
      MEMBERS_WORK_EXPERIENCE_DISTRIBUTION: 'api/v2/stats/communities/members_work_experience_distribution',
      SPEAKERS_DISTRIBUTION: 'api/v2/stats/communities/speakers_distribution',
      MEMBERS_CONTENT_CREATORS: 'api/v2/stats/communities/members_content_creators',
      EVENT_ATTENDANCE_STATS: 'api/v2/stats/communities/event_attendance_stats',
    },
    LABS: {
      USER_ENGAGEMENT: 'api/v2/stats/labs/user_engagement',
    },
    COMMUNITY_BUILDS: {
      USER_ENGAGEMENT: 'api/v2/stats/community_builds/user_engagement',
    },
  },

  TAGS: {
    INDEX: 'api/v2/tags',
    UPDATE: 'api/v2/tags',
  },

  MENTIONS: {
    INDEX: 'api/v2/mentions',
    USERS: 'api/v2/mentions/user_entities',
    OTHERS: 'api/v2/mentions/other_entities',
  },

  NOTIFICATIONS: {
    INDEX: 'api/v2/notifications',
    MARK_ALL_AS_READ: 'api/v2/notifications/mark_all_as_read',
    UNREAD_COUNT: 'api/v2/notifications/unread_count',
    UPDATE_STATUS: 'api/v2/notifications/update_status',
    INDEX_BY_COMMUNITY: 'api/v2/notifications/index_by_community',
  },

  RECOMMENDATIONS: {
    LABS: 'api/v2/disco_recommendations/labs',
    COMMUNITY_BUILDS: 'api/v2/disco_recommendations/community_builds',
    COMMUNITIES: 'api/v2/disco_recommendations/communities',
  },

  PUSH_NOTIFICATION_SUBSCRIPTIONS: {
    CREATE: 'api/v2/push_notification_subscriptions',
  },

  USER_WORK_HISTORY: {
    INDEX: 'api/v2/user_work_histories',
    CREATE: 'api/v2/user_work_histories',
    UPDATE: 'api/v2/user_work_histories',
    DESTROY: 'api/v2/user_work_histories',
  },

  USER_RESUME: {
    INDEX: 'api/v2/user_resumes',
    SHOW: 'api/v2/user_resumes/show',
    CREATE: 'api/v2/user_resumes',
    UPDATE: 'api/v2/user_resumes',
    DESTROY: 'api/v2/user_resumes',
  },

  JOBS: {
    INDEX: 'api/v2/jobs',
    SHOW: 'api/v2/jobs/show',
    CREATE: 'api/v2/jobs',
    UPDATE: 'api/v2/jobs',
    DESTROY: 'api/v2/jobs',
    EMPLOYEES: 'api/v2/jobs/employees',
    EMPLOYERS: 'api/v2/jobs/employers',
    TOGGLE_STATUS: 'api/v2/jobs/toggle_status',
  },

  JOB_APPLICATIONS: {
    INDEX: 'api/v2/job_applications',
    MY_APPLICATIONS: 'api/v2/job_applications/my_applications',
    CREATE: 'api/v2/job_applications',
    UPDATE_STATUS: 'api/v2/job_applications/update_status',
    UPDATE: 'api/v2/job_applications',
    DESTROY: 'api/v2/job_applications',
  },

  STRIPE_HANDLER: {
    INDEX: 'api/v2/stripe_connect_accounts',
    CREATE: 'api/v2/stripe_connect_accounts',
    RETRIEVE_ACCOUNT: 'api/v2/stripe_connect_accounts/retrieve_account',
    ACCOUNT_LINK: 'api/v2/stripe_connect_accounts/account_link',
  },
  DISCOUNT_CODES: {
    CREATE: 'api/v2/discount_codes',
    UPDATE: 'api/v2/discount_codes',
    INDEX: 'api/v2/discount_codes',
    DELETE: 'api/v2/discount_codes',
    CAN_BE_APPLIED: 'api/v2/discount_codes/can_be_applied',
  },

  PAID_TICKET_SETTINGS: {
    CREATE: 'api/v2/paid_ticket_settings',
    UPDATE: 'api/v2/paid_ticket_settings',
    INDEX: 'api/v2/paid_ticket_settings/details',
    CALCULATE_COMMUDLE_FEE_AMOUNT: 'api/v2/paid_ticket_settings/calculate_commudle_fee_amount',
    PUBLIC: {
      SHOW: 'api/v2/paid_ticket_settings/public/show',
    },
  },

  EVENT_TICKET_ORDERS: {
    CREATE: 'api/v2/event_ticket_orders',
    UPDATE: 'api/v2/event_ticket_orders',
    CHECK: 'api/v2/event_ticket_orders/check_payment',
    SHOW: 'api/v2/event_ticket_orders/show',
    CHECK_PAYMENT: 'api/v2/event_ticket_orders/check_payment',
    CHECK_REFUND_AMOUNT: 'api/v2/event_ticket_orders/check_refund_amount',
    CREATE_REFUND: 'api/v2/event_ticket_orders/create_refund',
  },

  CUSTOM_PAGES: {
    CREATE: 'api/v2/custom_pages', //POST
    UPDATE: 'api/v2/custom_pages', //PUT
    DELETE: 'api/v2/custom_pages', //DELETE
    SHOW: 'api/v2/custom_pages/show', //GET
    INDEX: 'api/v2/custom_pages', //GET
    GET_SLUG: 'api/v2/custom_pages/generate_slug',
    REFUND_POLICY_PAGE: 'api/v2/custom_pages/refund_policy_page',
    PUBLIC: {
      SHOW: 'api/v2/custom_pages/public/show', //GET
      INDEX: 'api/v2/custom_pages/public/index', //GET
    },
  },

  NEWSLETTER: {
    CREATE: 'api/v2/newsletters', //POST
    UPDATE: 'api/v2/newsletters', //PUT
    DELETE: 'api/v2/newsletters', //DELETE
    SHOW: 'api/v2/newsletters/show', //GET
    INDEX: 'api/v2/newsletters', //GET
    SET_SCHEDULE: 'api/v2/newsletters/set_schedule', //POST
    RESET_SCHEDULE: 'api/v2/newsletters/reset_schedule', //DELETE
    SEND_TEST_EMAIL: 'api/v2/newsletters/send_test_email', //POST
    EMAIL_STATS: 'api/v2/newsletters/email_stats', //GET
    ATTACH_TEXT_IMAGE: 'api/v2/newsletters/attach_text_image', //PUT
    PUBLIC: {
      SHOW: 'api/v2/newsletters/public/show', //GET
      INDEX: 'api/v2/newsletters/public/index', //GET
    },
  },

  HACKATHONS: {
    CREATE: 'api/v2/hackathons', //POST
    UPDATE: 'api/v2/hackathons', //PUT
    INDEX: 'api/v2/hackathons', //GET
    SHOW: 'api/v2/hackathons/show', //GET
    CREATE_CONTACT_INFO: 'api/v2/hackathons/create_contact_info', //POST
    UPDATE_CONTACT_INFO: 'api/v2/hackathons/update_contact_info', //PUT
    SHOW_CONTACT_INFO: 'api/v2/hackathons/show_contact_info', //GET
    UPDATE_HACKATHON_DATE: 'api/v2/hackathons/update_hackathon_dates', // POST
    CREATE_SPONSOR: 'api/v2/hackathons/create_sponsor', //POST
    UPDATE_SPONSOR: 'api/v2/hackathons/update_sponsor', //PUT
    INDEX_SPONSORS: 'api/v2/hackathons/index_sponsors', //GET
    DESTROY_SPONSOR: 'api/v2/hackathons/destroy_sponsor', //DELETE
    CREATE_TRACK: 'api/v2/hackathons/create_track', //POST
    UPDATE_TRACK: 'api/v2/hackathons/update_track', //PUT
    INDEX_TRACKS: 'api/v2/hackathons/index_tracks', //GET
    DESTROY_TRACK: 'api/v2/hackathons/destroy_track', //DELETE
    CREATE_PRIZE: 'api/v2/hackathons/create_prize', //POST
    UPDATE_PRIZE: 'api/v2/hackathons/update_prize', //PUT
    DESTROY_PRIZE: 'api/v2/hackathons/destroy_prize', //DELETE
    INDEX_TRACK_PRIZE: 'api/v2/hackathons/index_track_prizes', //GET
    INDEX_HACKATHON_PRIZES: 'api/v2/hackathons/index_prizes', //GET
    CHECK_DUPLICATE_JUDGE: 'api/v2/hackathons/check_duplicate_judge', //GET
    CREATE_JUDGE: 'api/v2/hackathons/create_judge', //POST
    UPDATE_JUDGE: 'api/v2/hackathons/update_judge', //PUT
    INDEX_JUDGES: 'api/v2/hackathons/index_judges', //GET
    DESTROY_JUDGE: 'api/v2/hackathons/destroy_judge', //DELETE
    INDEX_USER_RESPONSES: 'api/v2/hackathons/index_user_responses', //GET
    SHOW_USER_RESPONSES_BY_TEAM: 'api/v2/hackathons/show_user_responses_by_team', //GET
    CHANGE_TEAM_REGISTRATION_STATUS: 'api/v2/hackathons/change_team_registration_status', //PUT
    GENERATE_TEAM_REGISTRATION_STATUS_NOTIFICATION: 'api/v2/hackathons/generate_team_registration_status_notification', //POST
    CHANGE_TEAM_ROUND_STATUS: 'api/v2/hackathons/change_team_round_status', //PUT
    GET_HACKATHON_CURRENT_REGISTRATION_DETAILS: 'api/v2/hackathons/get_hackathon_current_registration_details', //GET
    UPDATE_STATUS: 'api/v2/hackathons/update_status', //PUT
    VERIFY_INVITATION_TOKEN_JUDGE: 'api/v2/hackathons/verify_invitation_token_judge', //GET
    UPDATE_INVITATION_TOKEN_JUDGE: 'api/v2/hackathons/update_invitation_token_judge', //PUT
    INVITE_USER: 'api/v2/hackathons/invite_user', //POST
    OVERALL_ROUND_SELECTION_UPDATE_EMAIL: 'api/v2/hackathons/overall_round_selection_update_email', //POST
    WINNER_ANNOUNCEMENT_EMAIL: 'api/v2/hackathons/winner_announcement_email', //POST
    STATUS_FILTER_GENERAL_EMAIL: 'api/v2/hackathons/status_filter_general_email', //POST
    PUBLIC: {
      SHOW: 'api/v2/hackathons/public/show', //GET
      INDEX: 'api/v2/hackathons/public/index', //GET
      INDEX_JUDGES: 'api/v2/hackathons/public/index_judges', //GET
      INDEX_PRIZES: 'api/v2/hackathons/public/index_prizes', //GET
      INDEX_TRACKS: 'api/v2/hackathons/public/index_tracks', //GET
      INDEX_SPONSORS: 'api/v2/hackathons/public/index_sponsors', //GET
      INDEX_PROJECTS: 'api/v2/hackathons/public/index_projects', //GET
      INTERESTED_USERS: 'api/v2/hackathons/public/interested_users', //GET
      IS_MEMBER_OF_PARENT: 'api/v2/hackathons/public/is_member_of_parent', //GET
    },
  },

  FAQ: {
    CREATE: 'api/v2/faq', //POST
    INDEX: 'api/v2/faq', //GET
    DELETE: 'api/v2/faq', //DELETE
    UPDATE: 'api/v2/faq/update', //PUT
    PUBLIC: {
      INDEX: 'api/v2/faq/public',
    },
  },

  HACKATHON_RESPONSE_GROUP: {
    CREATE: 'api/v2/hackathon_response_group', //POST
    UPDATE: 'api/v2/hackathon_response_group', //PUT
    SHOW: 'api/v2/hackathon_response_group/show', //GET
    PUBLIC: {
      SHOW: 'api/v2/hackathon_response_group/public/show', //GET
    },
  },

  HACKATHON_USER_RESPONSE: {
    CREATE: 'api/v2/hackathon_user_response', //POST
    UPDATE: 'api/v2/hackathon_user_response', //PUT
    GET_EXISTING_HACKATHON_USER_RESPONSES: 'api/v2/hackathon_user_response/get_existing_hackathon_user_responses', //GET
    UPDATE_TEAM_DETAILS: 'api/v2/hackathon_user_response/update_team_details', //PUT
    UPDATE_PROJECT_DETAILS: 'api/v2/hackathon_user_response/update_project_details', //PUT
    GET_TEAM_DETAILS: 'api/v2/hackathon_user_response/get_team_details', //GET
    VERIFY_INVITATION_TOKEN_HUR: 'api/v2/hackathon_user_response/verify_invitation_token_hur', //GET
    UPDATE_INVITATION_TOKEN_HUR: 'api/v2/hackathon_user_response/update_invitation_token_hur', //PUT
    COMPLETE_HUR_STATUS: 'api/v2/hackathon_user_response/complete_hur_status', //PUT
    GET_DATA_FORM_RESPONSES: 'api/v2/hackathon_user_response/get_data_form_responses', //GET
  },

  ENTITY_UPDATES: {
    INDEX: 'api/v2/entity_updates',
    CREATE: 'api/v2/entity_updates',
    DELETE: 'api/v2/entity_updates',
    PUBLIC: {
      INDEX: 'api/v2/entity_updates/public/index',
    },
  },

  ROUND: {
    CREATE: 'api/v2/round', //POST
    INDEX: 'api/v2/round', //GET
    DELETE: 'api/v2/round', //DELETE
    UPDATE: 'api/v2/round', //PUT
    PUBLIC: {
      INDEX: 'api/v2/round/public',
    },
  },

  NOTE: {
    CREATE: 'api/v2/note', //POST
    INDEX: 'api/v2/note', //GET
    DELETE: 'api/v2/note', //DELETE
    UPDATE: 'api/v2/note', //PUT
    PUBLIC: {
      INDEX: 'api/v2/note/public',
    },
  },

  HACKATHON_WINNER: {
    ADD_WINNER: 'api/v2/hackathon_winner/add_winner', //PUT
    REMOVE_WINNER: 'api/v2/hackathon_winner', //DELETE
  },

  HACKATHON_JUDGE: {
    RESEND_INVITE: 'api/v2/hackathon_judge/resend_invite', //PUT
  },

  EXPERTS: {
    INDEX: 'api/v2/experts',
    INDEX_EXPERTS: 'api/v2/experts/index_experts',
  },

  RAZORPAY: {
    CREATE: 'api/v2/razorpay', //POST
    INDEX: 'api/v2/razorpay', //GET
    FIND_OR_CREATE_ORDER: 'api/v2/razorpay/find_or_create_order', //POST
    CREATE_OR_UPDATE_PAYMENT: 'api/v2/razorpay/create_or_update_payment', //PUT
    GET_ALL_PAYMENT_DETAILS: 'api/v2/razorpay/get_all_payment_details', //GET
    CREATE_TRANSFER: 'api/v2/razorpay/create_transfer', //GET
    GET_TRANSFER_DETAILS: 'api/v2/razorpay/get_transfer_details', //GET
    CREATE_MISSING_RZP_PAYMENT: 'api/v2/razorpay/create_missing_rzp_payment', //GET
  },
};
