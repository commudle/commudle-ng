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
  draft = '#ff6a00',
  submitted = '#0095fe',
  published = '#23d004',
  flagged = 'red',
  removed = 'red',
}

export const CBuildTypeDisplay = {
  project: {
    color: '#4e74ff',
    icon: 'flash',
  },
  product: {
    color: '#4e74ff',
    icon: 'flash',
  },
  slides: {
    color: '#ff8f4e',
    icon: 'film',
  },
  course: {
    color: '#e91e63',
    icon: 'book-open',
  },
  other: {
    color: '#3ee044',
    icon: 'arrow-right',
  },
};
