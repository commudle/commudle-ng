import { IUser } from './user.model';

export interface IDiscussionFollower {
  id: number;
  user: IUser;
  discussion_id: number;
  unread: boolean;
}
