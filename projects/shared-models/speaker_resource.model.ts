import { IUser } from './user.model';
import { IEvent } from './event.model';

export interface ISpeakerResource {
  id: number;
  title: string;
  session_details_links: string;
  embedded_content: string;
  user: IUser;
  event: IEvent;
  created_at: Date;
}
