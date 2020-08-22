import { IUser } from 'projects/shared-models/user.model';
export interface IFixedEmail {
  id: number;
  subject: string;
  message: string;
  created_at: Date;
  mail_type: string;
  emails_count: number;
  user: IUser;
}
