import { ICommunity } from './community.model';
import { IPalette } from './palette.model';

export interface IFeaturedCommunity {
  id: number;
  reason: string;
  kommunity: ICommunity;
  palette: IPalette;
}
