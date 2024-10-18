import { IEventEntryPass } from './event_entry_pass.model';
import { IRegistrationStatus } from './registration_status.model';
import { IUser } from './user.model';
import { IDataFormEntityResponseValue } from './data_form_entity_response_value.model';
import { ITrackSlot } from 'apps/shared-models/track-slot.model';
import { EDbModels, IEvent, IHackathon, IHackathonTeam } from '@commudle/shared-models';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';

export interface IDataFormEntityResponseGroup {
  id: number;
  registration_status: IRegistrationStatus;
  user: IUser;
  created_at?: Date;
  entry_pass: IEventEntryPass;
  data_form_entity_response_values: IDataFormEntityResponseValue[];
  track_slots: ITrackSlot[];
  registration_for?: EDbModels;
  event?: IEvent;
  hackathon?: IHackathon;
  hackathon_team?: IHackathonTeam;
  event_data_form_entity_group?: IEventDataFormEntityGroup;
}
