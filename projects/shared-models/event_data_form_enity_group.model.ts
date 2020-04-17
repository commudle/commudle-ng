import { IRegistrationType } from './registration_type.model';
import { IDataFormEntity } from './data_form_entity.model';

export interface IEventDataFormEntityGroup {
  id: number;
  name: string;
  created_at: Date;
  rsvp_open: boolean;
  registration_type: IRegistrationType;
  data_form_entity: IDataFormEntity;
  responses_count: number;
}
