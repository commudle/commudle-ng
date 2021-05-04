import { IUser } from './user.model';

export interface IMainNewsletter {
  id: number;
  user: IUser;
  title: string;
  slug: string;
  content: string;
  email_subject: string;
  create_at: Date;
  status: EMainNewsletterStatuses
}


export enum EMainNewsletterStatuses {
  DRAFT = 'Draft',
  PUBLISHED = 'Published'
}
