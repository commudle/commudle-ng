import { ISingleExternalFeed } from './single-external-feed.model';

export interface IExternalFeed {
  feed_posts: ISingleExternalFeed[];
  page: number;
  count: number;
  total: number;
}
