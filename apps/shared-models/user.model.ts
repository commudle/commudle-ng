import { IAttachedFile } from './attached-file.model';
import { IBadge } from './badge.model';
import { ITag } from './tag.model';

export interface IUser {
  id: number;
  name: string;
  email: string;
  about_me: string;
  designation: string;
  personal_website: string;
  linkedin: string;
  github: string;
  twitter: string;
  dribbble: string;
  behance: string;
  medium: string;
  gitlab: string;
  facebook: string;
  youtube: string;
  gender: string;
  avatar: string;
  profile_banner_image: IAttachedFile;
  username: string;
  location: string;
  tags: ITag[];
  is_expert: boolean;
  badges: IBadge[];
  followers_count: number;
  followees_count: number;
  photo: IAttachedFile;
  is_employee: boolean;
  is_employer: boolean;
  profile_completed: boolean;
  speaker_events?: [];
  community_builds_count?: number;
  social_resources_count?: number;
  labs_count?: number;
  user_roles_users?: UserRolesUsers;
}

export interface IUserSearch extends IUser {
  type: string;
}

export interface UserRolesUsers {
  role_designation: string;
}
