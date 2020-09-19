import { IUser } from './user.model';

export interface IEmbeddedVideoStream {
  id: number;
  source: string;
  streamable_type: string;
  streamable_id: number;
  embed_code: string;
  user: IUser;
  zoom_host_email: string;
  zoom_password: string;
  zoom_host_signature: string;
  zoom_attendee_signature: string;
}
