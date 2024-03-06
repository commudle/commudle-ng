import { IHackathonPrize } from 'apps/shared-models/hackathon-prize.model';

export interface IHackathonWinner {
  id: number;
  hackathon_prize: IHackathonPrize;
}
