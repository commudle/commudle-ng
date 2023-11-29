import { IAttachedFile } from '@commudle/shared-models';

export interface INewsletter {
  id: number;
  slug: string;
  title: string;
  published: boolean;
  content: string;
  email_subject: string;
  banner_image: IAttachedFile;
  created_at: Date;
  scheduled_for: Date;
}
