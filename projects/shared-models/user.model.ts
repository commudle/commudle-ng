import { IAttachedFile } from "./attached-file.model";

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
  gender: string;
  avatar: string;
  profile_banner_image: IAttachedFile;
  username: string;
}
