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
  publish_status: EPublishStatus;
  images: IAttachedFile[];
  created_at: Date;
  updated_at: Date;
  lab_steps: ILabStep[];
  tags: string[];
  last_visited_step_id: number;
}


export enum EPublishStatus {
  draft = 'draft',
  submitted = 'submitted',
  published = 'published',
  flagged = 'flagged',
  removed = 'removed'
}

export enum EPublishStatusColors {
  draft = '#ff6a00',
  submitted = '#0095fe',
  published = '#23d004',
  flagged = 'red',
  removed = 'red'
}
