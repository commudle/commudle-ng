import { IAttachedFile } from './attached-file.model';
import { IBadge } from './badge.model';
import { ITag } from './tag.model';

export interface ICurrentUser {
  id: number;
  name: string;
  email: string;
  about_me: string;
  designation: string;
  personal_website: string;
  linkedin: string;
  github: string;
  twitter: string;
  gender: string;
  dribbble: string;
  behance: string;
  medium: string;
  gitlab: string;
  facebook: string;
  youtube: string;
  avatar: string;
  photo: IAttachedFile;
  user_roles: string[];
  has_community_builds: boolean;
  profile_completed: boolean;
  has_labs: boolean;
  username: string;
  location: string;
  tags: ITag[];
  is_expert: boolean;
  badges: IBadge[];
}
