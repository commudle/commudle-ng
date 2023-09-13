import { IAttachedFile } from './attached-file.model';
import { IEventStatus } from './event-status.model';
import { ICommunity } from './community.model';
import { ISpeakerResource } from './speaker-resource.model';
import { ITag } from './tag.model';

export interface IEvent {
  id: number;
  name: string;
  header_image_path: string;
  description: string;
  start_time: Date;
  end_time: Date;
  kommunity_id: number;
  created_at: Date;
  user: string;
  slug: string;
  event_status: IEventStatus;
  seats: number;
  timezone: string;
  custom_registration: boolean;
  custom_agenda: boolean;
  editable: boolean;
  tags: ITag[];
  kommunity_slug: string;
  header_image?: IAttachedFile;
  event_type: string;
  event_locations_count: number;
  event_speakers_count: number;
  event_volunteers_count: number;
  interested_members_count: number;
  registrations_count?: number;
  attended_members_count?: number;
  kommunity?: ICommunity;
  speaker_resource?: ISpeakerResource;
  event_locations?: object;
}

export interface IEventSearch extends IEvent {
  type: string;
}
