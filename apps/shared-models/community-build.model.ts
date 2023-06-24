import { IAttachedFile } from './attached-file.model';
import { IUser } from './user.model';
import { IUserRolesUser } from './user_roles_user.model';

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

export enum EPublishStatus {
  draft = 'draft',
  submitted = 'submitted',
  published = 'published',
  flagged = 'flagged',
  removed = 'removed',
}

export enum EPublishStatusColors {
  draft = 'com-bg-orange-500',
  submitted = 'com-bg-primary-500',
  published = 'com-bg-lime-300',
  flagged = 'com-bg-red-500',
  removed = 'com-bg-red-500',
}

//TODO redefine colors
export const CBuildTypeDisplay = {
  project: {
    color: 'com-bg-Blueberry',
    icon: 'flash',
  },
  product: {
    color: 'com-bg-Blueberry',
    icon: 'flash',
  },
  slides: {
    color: 'com-bg-orange-400',
    icon: 'film',
  },
  course: {
    color: 'com-bg-red-500',
    icon: 'book-open',
  },
  other: {
    color: 'com-bg-green-500',
    icon: 'arrow-right',
  },
};
