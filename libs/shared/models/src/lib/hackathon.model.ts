import { ICommunityGroup } from './community-group.model';
import { IAttachedFile } from './attached-file.model';
import { ICommunity } from './community.model';

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
  timezone: string;
  created_at: Date;
  location_id: number;
  location_name: string;
  location_address: string;
  location_map_link: string;
  updates_count: number;
  prizes_count: number;
  faqs_count: number;
  sponsors_count: number;
  tracks_count: number;
  judges_count: number;
  projects_count: number;
  min_number_of_teammates: number;
  max_number_of_teammates: number;
  status: EHackathonStatus;
  community: ICommunity;
  community_group: ICommunityGroup;
  total_prize_amount: object;
  kommunity_slug?: string;
  interested_members_count?: number;
  start_time?: Date;
}

export enum EParticipateTypes {
  TEAM = 'team',
  INDIVIDUAL = 'individual',
}

export enum EHackathonLocationType {
  OFFLINE = 'offline',
  ONLINE = 'online',
  HYBRID = 'hybrid',
}

export enum EHackathonStatus {
  DRAFT = 'draft',
  OPEN = 'open',
  COMPLETED = 'completed',
  CANCELED = 'canceled',
}
