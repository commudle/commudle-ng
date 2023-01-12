import { ICommunityBuild } from './community-build.model';

export interface ICommunityBuilds {
  community_builds: ICommunityBuild[];
  page: number;
  count: number;
  total: number;
}
