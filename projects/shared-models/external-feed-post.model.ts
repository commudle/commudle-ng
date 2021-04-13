import { IAttachedFile } from './attached-file.model';

export interface IExternalFeedPost {
  id: number;
  source: string;
  title: string;
  description: string;
  link: string;
  created_at: Date;
  published_at: Date;
  likes_count: number;
  comments_count: number;
  images: IAttachedFile[];
  tags: string[];
}
