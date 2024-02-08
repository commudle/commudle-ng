import { IAttachedFile } from '@commudle/shared-models';

export interface IHackathon {
  id: number;
  name: string;
  slug: string;
  description: string;
  hackathon_theme: string;
  participate_types: EParticipateTypes;
  hackathon_location_type: EHackathonLocationType;
  tagline: string;
  number_of_participants: number;
  banner_image: IAttachedFile;
  start_date: Date;
  end_date: Date;
  application_start_date: Date;
  application_end_date: Date;
  time_zone: string;
  created_at: Date;
  location_id: number;
  location_name: string;
  location_address: string;
  location_map_link: string;
  updates_count: number;
  faqs_count: number;
  sponsors_count: number;
}

export enum EParticipateTypes {
  BOTH = 'both',
  TEAM = 'team',
  INDIVIDUAL = 'individual',
}

export enum EHackathonLocationType {
  OFFLINE = 'offline',
  ONLINE = 'online',
  HYBRID = 'hybrid',
}
