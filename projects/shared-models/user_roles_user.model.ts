import { ICommunity } from './community.model';
import { IUser } from './user.model';
import { IUserRole } from './user_role.model';

export interface IUserRolesUser {
  id: number;
  user_role: IUserRole;
  user: IUser;
  active: boolean;
  parent_id: number;
  parent_type: string;
  parent_name: string;
  status: EUserRolesUserStatus;
  community?: ICommunity;
}

export enum EUserRolesUserStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  REMOVED = 'removed',
  JOINED_BY_TOKEN = 'joined_by_token',
}
