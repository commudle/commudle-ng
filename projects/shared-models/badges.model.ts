import { IBadge } from './badge.model';
export interface IBadges {
  // keeping id to any because it can be null
  badges: IBadge[];
  page: number;
  count: number;
  total: number;
}


