import { ISponsor } from './sponsor.model';

export interface IEventSponsor {
  id: number;
  sponsor: ISponsor;
  event_id: number;
}
