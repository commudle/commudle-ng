import { IUser } from './user.model';
import { IRegistrationStatus } from './registration_status.model';
import { IEventEntryPass } from './event_entry_pass.model';
import { ISpeakerResource } from './speaker_resource.model';

export interface IUserEventRegistration {
  id: number;
  user_id: number;
  user: IUser;
  rsvp_token: string;
  registration_status: IRegistrationStatus;
  entry_pass: IEventEntryPass;
  speaker_resource: ISpeakerResource;
}
