import { ISponsor } from './sponsor.model';

export interface IHackathonSponsor {
  id: number;
  sponsor: ISponsor;
  hackathon_id: number;
  tier_name: string;
  tier_priority: number;
}
