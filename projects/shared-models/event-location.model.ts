import { ILocation } from './location.model';
import { IEventLocationTrack } from './event-location-track.model';

export interface IEventLocation {
  id: number;
  event_id: number;
  location: ILocation;
  event_location_tracks: IEventLocationTrack[];
}
