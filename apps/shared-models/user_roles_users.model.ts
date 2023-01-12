import { IUserRolesUser } from './user_roles_user.model';

export interface IUserRolesUsers {
  user_roles_users: IUserRolesUser[];
  page: number;
  count: number;
  total: number;
}
