import { EDbModels } from './db-models.enum';
import { IEvent } from './event.model';
import { IHackathon } from './hackathon.model';

export interface IUpcomingEventHackathon {
  object_type: EDbModels;
  //TODO IEvent | IHackathon;
  data: any;
}
