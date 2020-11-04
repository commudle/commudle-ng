import { IUser } from './user.model';

export interface ICommunityChannel {
  user: IUser;
  kommunity_id: number;
  name: string;
  description: string;
  join_token: string;
  is_private: boolean;

}

