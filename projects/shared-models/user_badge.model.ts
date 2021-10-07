import { IBadge } from './badge.model';
import { IUser } from './user.model';

export interface IUserBadge {
  id: number;
  user: IUser;
  badge: IBadge;
}
