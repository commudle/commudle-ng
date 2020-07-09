import { IUser } from './user.model';
import { IAttachedFile } from './attached-file.model';

export interface ICommunityBuild {
  id: number;
  user: IUser;
  name: string;
  description: string;
  build_type: string;
  project_status: string;
  publish_status: string;
  link: string;
  contact: string;
  open_source: boolean;
  need_team: boolean;
  created_at: Date;
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
  published = 'publish',
  flagged = 'flagged',
  removed = 'removed'

}

