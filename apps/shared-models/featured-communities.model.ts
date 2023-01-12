import { IFeaturedCommunity } from 'apps/shared-models/featured-community.model';

export interface IFeaturedCommunities {
  featured_communities: IFeaturedCommunity[];
  page: number;
  count: number;
  total: number;
}
