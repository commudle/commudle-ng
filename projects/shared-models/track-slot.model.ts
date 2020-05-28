import { IUser } from './user.model';
import { IEmbeddedVideoStream } from './embedded_video_stream.model';

export interface ITrackSlot {
  id: number;
  event_location_track_id: number;
  start_time: Date;
  end_time: Date;
  session_title: string;
  tags_list: string;
  speaker_registration_id: number;
  user: IUser;
  embedded_video_stream: IEmbeddedVideoStream;
  event_id: number;
  user_vote: boolean;

}
