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
  data_form_id: number;
  data_form_entity_id: number;
}

interface IUserDetails {
  name: boolean;
  designation: boolean;
  about_me: boolean;
  location: boolean;
  work_experience_months: boolean;
  education: boolean;
  phone: boolean;
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
