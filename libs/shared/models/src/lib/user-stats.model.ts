export interface IUserStatsModel {
  events_attended_count: number;
  profile_views: {
    overall: {
      ninety_days: number;
    };
  };
  published_community_builds_count: number;
  published_labs_count: number;
  social_resources_count: number;
  speaker_events_count: number;
}
