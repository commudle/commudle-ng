import { IFeedItem } from './feed-item.model';

export interface IFeedItems {
  feed_items: IFeedItem[];
  page:number;
  count:number;
  total:number;
}