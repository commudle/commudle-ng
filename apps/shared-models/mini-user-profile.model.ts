import { IUser } from './user.model';

export interface IMiniUserProfile extends IUser {
  communities_count: number;
}
