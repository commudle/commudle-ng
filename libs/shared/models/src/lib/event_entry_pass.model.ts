import { IUser } from './user.model';

export interface IEventEntryPass {
  id: number;
  unique_code: string;
  attendance: boolean;
  uninvited: boolean;
  is_first_time_attendance: boolean;
  user: IUser;
}
