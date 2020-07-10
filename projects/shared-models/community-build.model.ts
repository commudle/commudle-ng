import { IUser } from './user.model';
import { IAttachedFile } from './attached-file.model';

export interface ICommunityBuild {
  id: number;
  user: IUser;
  name: string;
  slug: string;
  description: string;
  build_type: string;
  publish_status: string;
  link: string;
  need_team: boolean;
  created_at: Date;
  votes_count: number;
  flags_count: number;
  images: IAttachedFile[];
  tags: string[];
}


export enum EBuildType {
  project = 'project',
  product = 'product',
  slides = 'slides',
  programme = 'programme',
  course = 'course',
  other = 'other'
}


export enum EProjectStatus {
  not_live = 'not_live',
  live = 'live'
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

