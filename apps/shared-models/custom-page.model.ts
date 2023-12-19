import { IUser } from '@commudle/shared-models';

export interface ICustomPage {
  id: number;
  slug: string;
  content: string;
  title: string;
  created_at: Date;
  updated_at: Date;
  description: string;
  published: boolean;
  user: IUser;
}
