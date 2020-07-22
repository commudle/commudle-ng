import { IAttachedFile } from './attached-file.model';
import { IUser } from './user.model';
import { ILabStep } from './lab-step.model';

export interface ILab {
  id: number;
  name: string;
  slug: string;
  description: string;
  header_image: IAttachedFile;
  user: IUser;
  publish_status: string;
  images: IAttachedFile[];
  created_at: Date;
  updated_at: Date;
  lab_steps: ILabStep[];
  tags: string[];
}


export enum EPublishStatus {
  draft = 'draft',
  submitted = 'submitted',
  published = 'published',
  flagged = 'flagged',
  removed = 'removed'
}
