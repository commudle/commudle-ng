import { IUserRole } from './user_role.model';
import { IUser } from './user.model';

export interface IUserRolesUser {
  id: number;
  user_role: IUserRole;
  user: IUser;
  active: boolean;
  parent_id: number;
  parent_type: string;
  status: EUserRolesUserStatus;
}



export enum EUserRolesUserStatus {
  INVITED = "invited",
  ACCEPTED = "accepted",
  REMOVED = "removed"
}
