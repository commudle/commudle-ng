import { IHackathonPrize } from './hackathon-prize.model';

export interface IHackathonWinner {
  id: number;
  hackathon_prize: IHackathonPrize;
}
