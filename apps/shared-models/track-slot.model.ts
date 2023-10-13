import { IUser } from './user.model';
import { IEmbeddedVideoStream } from './embedded_video_stream.model';
import { ISpeakerResource } from './speaker_resource.model';

export interface ITrackSlot {
  id: number;
  event_location_track_id: number;
  event_location_track_name: string;
  start_time: Date;
  end_time: Date;
  session_title: string;
  tags_list: string;
  speaker_registration_id: number;
  user: IUser;
  embedded_video_stream: IEmbeddedVideoStream;
  event_id: number;
  user_vote: boolean;
  speaker_resource: ISpeakerResource;
  rsvp_token: string;
  track_slot_speakers: ITrackSlotSpeakers[];
}

export interface ITrackSlotSpeakers {
  speaker_registration_id: number;
  user: IUser;
}
