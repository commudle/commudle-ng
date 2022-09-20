import { IFeaturedCommunity } from './featured-community.model';

export interface IFeaturedCommunities {
  featured_communities: IFeaturedCommunity[];
  page: number;
  count: number;
  total: number;
}
