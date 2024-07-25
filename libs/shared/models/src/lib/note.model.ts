import { IUser } from './user.model';

export interface INote {
  id: number;
  text: string;
  parent_type: string;
  parent_id: number;
  user_id: number;
  user: IUser;
  created_at: Date;
}
