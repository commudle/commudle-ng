import { IUser } from './user.model';

export interface IUserMessage {
  id: number;
  parent_type: string;
  parent_id: string;
  user: IUser;
  content: string;
  votes_count: number;
  flags_count: number;
}
