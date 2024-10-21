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
  has_social_resources: boolean;
  work_experience_months: number;
  is_community_leader: boolean;
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
  speaker_events?: any;
  community_builds_count?: number;
  social_resources_count?: number;
  labs_count?: number;
  user_roles_users?: UserRolesUsers;
  user_roles: string[];
  has_community_builds: boolean;
  has_labs: boolean;
  profile_banner_image: IAttachedFile;
  deactivated: boolean;
  speaker_events_count: number;
  phone: string;
  phone_country_code: string;
  total_builds_votes?: number;
  published_community_builds_count?: number;
  communities_count?: number;
  looking_for_work?: boolean;
  hiring?: boolean;
  published_labs_count?: number;
  total_labs_votes?: number;
  created_at: Date;
  instagram: string;
}

export interface IUserSearch extends IUser {
  type: string;
}

export interface UserRolesUsers {
  role_designation: string;
}

export interface IUsers {
  users: IUser[];
  page: number;
  total: number;
}
