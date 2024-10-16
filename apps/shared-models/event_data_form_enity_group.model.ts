import { IRegistrationType } from './registration_type.model';
import { IDataFormEntity } from './data_form_entity.model';
import { ICommunity, IEvent } from '@commudle/shared-models';

export interface IEventDataFormEntityGroup {
  id: number;
  name: string;
  created_at: Date;
  rsvp_open: boolean;
  registration_type: IRegistrationType;
  data_form_entity: IDataFormEntity;
  responses_count: number;
  data_form_entity_id: number;
  already_filled: boolean;
  is_paid: boolean;
  summary_registration_counts: any;
  event: IEvent;
  community: ICommunity;
  user_details: any;
  allow_cancellation: boolean;
}
