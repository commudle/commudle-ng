import { IExternalFeedPost } from './external-feed-post.model';

export interface IExternalFeed {
  feed_posts: IExternalFeedPost[];
  page: number;
  count: number;
  total: number;
}
