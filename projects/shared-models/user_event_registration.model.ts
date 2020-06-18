import { IUser } from './user.model';
import { IRegistrationStatus } from './registration_status.model';
import { IEventEntryPass } from './event_entry_pass.model';

export interface IUserEventRegistration {
  id: number;
  user_id: number;
  user: IUser;
  registration_status: IRegistrationStatus;
  entry_pass: IEventEntryPass;
}
