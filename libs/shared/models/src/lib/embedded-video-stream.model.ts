import { IUser } from './user.model';
import { IYoutubeBroadcast } from './youtube-broadcast.model';

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
  hms_room_id: string;
  is_recorded: boolean;
  rtmp_url: string;
  is_recording: boolean;
  is_streaming: boolean;
  youtube_broadcast: IYoutubeBroadcast;
}
