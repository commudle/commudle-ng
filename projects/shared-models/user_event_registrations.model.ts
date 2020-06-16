import { IUser } from './user.model';
import { IRegistrationStatus } from './registration_status.model';
import { IUserEventRegistration } from './user_event_registration.model';

export interface IUserEventRegistrations {
  user_event_registrations: IUserEventRegistration[];
  page: number;
  count: number;
  total: number;
}
