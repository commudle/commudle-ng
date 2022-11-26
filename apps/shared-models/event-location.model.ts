import { ILocation } from './location.model';
import { IEventLocationTrack } from './event-location-track.model';
import { IEmbeddedVideoStream } from './embedded_video_stream.model';

export interface IEventLocation {
  id: number;
  event_id: number;
  location: ILocation;
  event_location_tracks: IEventLocationTrack[];
  embedded_video_stream: IEmbeddedVideoStream;
  event_type: string;
}


export enum EEventType {
  OFFLINE_ONLY = 'offline_only',
  OFFLINE_AND_ONLINE = 'offline_and_online',
  ONLINE_ONLY = 'online_only'
}
