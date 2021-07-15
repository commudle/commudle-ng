import { ICommunity } from 'projects/shared-models/community.model';

export interface IFeaturedCommunity {
  id: number;
  reason: string;
  kommunity: ICommunity;
}
