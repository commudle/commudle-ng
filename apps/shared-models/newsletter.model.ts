import { IAttachedFile } from '@commudle/shared-models';
import { IEmailStatsOverview } from 'apps/shared-models/email-stats-overview.model';

export interface INewsletter {
  id: number;
  slug: string;
  title: string;
  published: boolean;
  content: string;
  email_subject: string;
  brief_description: string;
  banner_image: IAttachedFile;
  created_at: Date;
  scheduled_for: Date;
  stats: IEmailStatsOverview;
  grapes_js_editor: boolean;
}
