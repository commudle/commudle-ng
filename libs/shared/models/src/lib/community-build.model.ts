import { IHackathonTeam } from './../../../../../apps/shared-models/hackathon-team.model';
import { IAttachedFile } from './attached-file.model';
import { IUserRolesUser } from './user-roles-user.model';
import { IUser } from './user.model';

export interface ICommunityBuild {
  id: number;
  user: IUser;
  name: string;
  slug: string;
  description: string;
  build_type: string;
  publish_status: EPublishStatus;
  link: string;
  created_at: Date;
  updated_at: Date;
  published_at: Date;
  votes_count: number;
  flags_count: number;
  chat_messages_count: number;
  images: IAttachedFile[];
  tags: string[];
  user_roles_users: IUserRolesUser[];
  video_iframe: string;
  live_app_link: string;
  hackathon_team: IHackathonTeam;
}

export interface ICommunityBuildSearch extends ICommunityBuild {
  type: string;
}

export enum EBuildType {
  project = 'project',
  // product = 'product',
  // slides = 'slides',
  course = 'course',
  // other = 'other'
}

enum EPublishStatus {
  draft = 'draft',
  submitted = 'submitted',
  published = 'published',
  flagged = 'flagged',
  removed = 'removed',
}

export { EPublishStatus as ECommunityBuildPublishStatus };

enum EPublishStatusColors {
  draft = 'com-bg-orange-500',
  submitted = 'com-bg-primary-500',
  published = 'com-bg-lime-300',
  flagged = 'com-bg-red-500',
  removed = 'com-bg-red-500',
}

export { EPublishStatusColors as ECommunityBuildPublishStatusColors };

export const CBuildTypeDisplay = {
  project: {
    color: 'com-bg-Blueberry', //#4e74ff
    icon: 'flash',
  },
  product: {
    color: 'com-bg-Blueberry', //#4e74ff
    icon: 'flash',
  },
  slides: {
    color: 'com-bg-orange-400', //#fb923c
    icon: 'film',
  },
  course: {
    color: 'com-bg-red-500', //#ef4444
    icon: 'book-open',
  },
  other: {
    color: 'com-bg-green-500', //#22c55e
    icon: 'arrow-right',
  },
};
