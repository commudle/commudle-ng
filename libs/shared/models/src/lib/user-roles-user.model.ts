import { ICommunity } from './community.model';
import { IUserRole } from './user-role.model';
import { IUser } from './user.model';

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
  role_designation?: string;
}

export enum EUserRolesUserStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  REMOVED = 'removed',
  JOINED_BY_TOKEN = 'joined_by_token',
  AUTO_JOINED = 'auto_joined',
}

export interface IUserRolesUsers {
  user_roles_users: IUserRolesUser[];
  page: number;
  count: number;
  total: number;
}
