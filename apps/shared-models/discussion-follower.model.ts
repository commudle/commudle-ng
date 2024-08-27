import { IUser } from './user.model';

export interface IDiscussionFollower {
  id: number;
  user: IUser;
  discussion_id: number;
  unread_user_ids: number[];
  last_message: {
    content: string;
    created_at: Date;
  };
  unread_messages_count: number;
}
