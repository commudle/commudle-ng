import { IAttachedFile } from './attached-file.model';
import { ITag } from './tag.model';

export interface ICommunity {
  id: number;
  name: string;
  logo_path: string;
  logo_image: IAttachedFile;
  logo_image_path: IAttachedFile;
  banner_image: IAttachedFile;
  about: string;
  slug: string;
  mini_description: string;
  contact_email: string;
  facebook: string;
  github: string;
  twitter: string;
  website: string;
  linkedin: string;
  members_count: number;
  location: string;
  tags: ITag[];
  is_visible: boolean;
  payments_enabled: boolean;
  emails_visible: boolean;
  hackathon_enabled: boolean;
  community_channels_count?: number;
  completed_events_count?: number;
  upcoming_events?: IUpcomingEvents[];
  upcoming_events_count: number;
  has_refund_policy: boolean;
  upcoming_hackathons_count: number;
}

export interface ICommunitySearch extends ICommunity {
  type: string;
}

interface IUpcomingEvents {
  id: string;
  name: string;
}
export interface ICommunities {
  communities: ICommunity[];
  page: number;
  count: number;
  total: number;
}
