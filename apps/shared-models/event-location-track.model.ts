import { ITrackSlot } from './track-slot.model';
import { IEmbeddedVideoStream } from './embedded_video_stream.model';

export interface IEventLocationTrack {
  id: number;
  event_id: number;
  event_location_id: number;
  name: string;
  description: string;
  track_slots: ITrackSlot[];
  embedded_video_stream: IEmbeddedVideoStream;
}
