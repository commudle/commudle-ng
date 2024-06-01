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
  page_type: EPageType;
}

export enum EPageType {
  GENERAL = 'general',
  REFUND_POLICIES = 'refund_policies',
}
