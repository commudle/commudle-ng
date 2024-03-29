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
  hackathon_id: number;
  hackathon_track?: IHackathonTrack;
  currency_symbol?: string; //used for display currency symbol not related to any API call
}
