export interface ICurrentUser {
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
  user_roles: string[];
  has_community_builds: boolean;
  profile_completed: boolean;
  has_labs: boolean;
  username: string;
}
