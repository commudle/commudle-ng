import { IEventEntryPass } from './event_entry_pass.model';
import { IRegistrationStatus } from './registration_status.model';
import { IUser } from './user.model';
import { IDataFormEntityResponseValue } from './data_form_entity_response_value.model';

export interface  IDataFormEntityResponseGroup {
  id: number;
  registration_status: IRegistrationStatus;
  user: IUser;
  created_at?: Date;
  entry_pass: IEventEntryPass;
  data_form_entity_response_values: IDataFormEntityResponseValue[];
}
