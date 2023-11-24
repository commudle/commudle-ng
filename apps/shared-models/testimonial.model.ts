import { IUser } from 'apps/shared-models/user.model';

export interface ITestimonial {
  content: string;
  username: string;
  userDesignation: string;
  user: IUser;
  createdAt: string;
  name: string;
}
