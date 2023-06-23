import { IAttachedFile } from './attached-file.model';
import { ILabStep } from './lab-step.model';
import { IUser } from './user.model';

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
  published_at: Date;
  lab_steps: ILabStep[];
  tags: string[];
  last_visited_step_id: number;
  votes?: number;
  visits?: number;
  votes_count?: number;
  total_visitors?: number;
  createdSince?: string;
}

export interface ILabSearch extends ILab {
  type: string;
}

export enum EPublishStatus {
  draft = 'draft',
  submitted = 'submitted',
  published = 'published',
  flagged = 'flagged',
  removed = 'removed',
}

//TODO redefine tags colors
export enum EPublishStatusColors {
  draft = 'com-bg-orange-500',
  submitted = 'com-bg-primary-500',
  published = 'com-bg-lime-300',
  flagged = 'com-bg-red-500',
  removed = 'com-bg-red-500',
}
