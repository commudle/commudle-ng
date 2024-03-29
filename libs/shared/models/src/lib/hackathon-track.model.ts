import { IHackathonPrize } from './hackathon-prize.model';

export interface IHackathonTrack {
  id: number;
  name: string;
  slug: string;
  description: string;
  problem_statement: string;
  hackathon_id: number;
  hackathon_prizes?: IHackathonPrize[];
}
