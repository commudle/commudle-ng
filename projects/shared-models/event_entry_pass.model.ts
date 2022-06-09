import { IUser } from 'projects/shared-models/user.model';

export interface IEventEntryPass {
  id: number;
  unique_code: string;
  attendance: boolean;
  uninvited: boolean;
  user: IUser;
}
