import { IUser } from './user.model';

export interface IMainNewsletter {
  id: number;
  user: IUser;
  title: string;
  slug: string;
  content: string;
  email_subject: string;
  created_at: Date;
  published_at: Date;
  status: EMainNewsletterStatuses,
  scheduled_for: Date;
  sent_at: Date;
  recipient_type: EMainNewsletterRecipientTypes;
}


export enum EMainNewsletterStatuses {
  DRAFT = 'draft',
  FINALIZED = 'finalized',
  PUBLISHED = 'published',
  ADMIN_COMMUNICATION = 'admin_communication'
}

export enum EMainNewsletterRecipientTypes {
  ALL_USERS = 'all_users',
  COMMUNITY_ORGANIZERS = 'community_organizers'
}
