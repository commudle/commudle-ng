import { IUser } from './user.model';

export interface IUsers {
  users: IUser[];
  page: number;
  total: number;
}
