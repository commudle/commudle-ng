import { IFeaturedCommunity } from 'projects/shared-models/featured-community.model';

export interface IFeaturedCommunities {
  featured_communities: IFeaturedCommunity[];
  page: number;
  count: number;
  total: number;
}
