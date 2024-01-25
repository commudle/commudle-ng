import { IUser } from '@commudle/shared-models';

export interface IHackathonResponseGroup {
  id: number;
  deleted_at: any;
  is_paid: boolean;
  multi_response: boolean;
  name: string;
  rsvp_open: boolean;
  slug: string;
  summary: any;
  user_details: IUserDetails;
  hackathon_id: number;
  registration_type_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface IUserDetails {
  name: boolean;
  designation: boolean;
  about: boolean;
  location: boolean;
  work_experience: boolean;
  education: boolean;
  phone_number: boolean;
  email: boolean;
  twitter: boolean;
  linkedin: boolean;
  dribbble: boolean;
  youtube: boolean;
  medium: boolean;
  behance: boolean;
  gitlab: boolean;
  github: boolean;
  facebook: boolean;
  tshirt_size: boolean;
}
