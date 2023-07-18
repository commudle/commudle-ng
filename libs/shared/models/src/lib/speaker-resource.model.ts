import { IEvent } from './event.model';
import { ITag } from './tag.model';
import { IUser } from './user.model';

export interface ISpeakerResource {
  id: number;
  title: string;
  session_details_links: string;
  embedded_content: string;
  user: IUser;
  event: IEvent;
  created_at: Date;
  user_event_registration_id: number;
  data_form_entity_response_group_id: number;
  tags?: ITag[];
  favicon?: string;
  description?: string;
}