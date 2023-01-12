import { ICommunity } from './community.model';

export interface ICommunities {
  communities: ICommunity[];
  page: number;
  count: number;
  total: number;
}
