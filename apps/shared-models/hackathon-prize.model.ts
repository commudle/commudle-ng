import { IHackathonTrack } from './hackathon-track.model';

export interface IHackathonPrize {
  id: number;
  name: string;
  slug: string;
  description: string;
  prize_amount: number;
  no_of_winners: number;
  hackathon_track_id: number;
  currency_type: string;
  order: number;
  hackathon_track?: IHackathonTrack;
}
