import { IAttachedFile } from "./attached-file.model";
import { IBadge } from "./badge.model";
import { ITag } from "./tag.model";

export interface IUser {
  id: number;
  name: string;
  email: string;
  phone: number;
  about_me: string;
  designation: string;
  personal_website: string;
  linkedin: string;
  github: string;
  twitter: string;
  dribble: string;
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
}
