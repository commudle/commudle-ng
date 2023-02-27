import { IUser } from './user.model';

export interface IEventPass {
  id: number;
  unique_code: string;
  attendance: boolean;
  uninvited: boolean;
  user: IUser;
}
