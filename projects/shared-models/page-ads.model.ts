import { IPageAd } from './page-ad.model';

export interface IPageAds {
  page_ads: IPageAd[];
  page: number;
  count: number;
  total: number;
}
