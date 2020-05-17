import { IUser } from './user.model';

export interface IUserMessage {
  id: number;
  created_at: Date;
  parent_type: string;
  parent_id: string;
  user: IUser;
  content: string;
  votes_count: number;
  flags_count: number;
  user_messages: IUserMessage[];
}
