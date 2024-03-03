import { IAttachedFile, ICommunity } from '@commudle/shared-models';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';

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
  tracks_count: number;
  min_number_of_teammates: number;
  max_number_of_teammates: number;
  status: EHackathonStatus;
  community: ICommunity;
  community_group: ICommunityGroup;
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
