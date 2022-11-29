import { IPageInfo } from 'projects/shared-models/page-info.model';
import { IUser } from './user.model';

export interface IUsers {
  users: IUser[];
  // page: number;
  total: number;
  page: Array<{ cursor: string; data: IUser[] }>;
  page_info: IPageInfo;
}
