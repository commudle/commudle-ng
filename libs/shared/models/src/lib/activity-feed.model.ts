import { EDbModels } from './db-models.enum';

export interface IActivityFeed {
  token: string;
  performer_type: EDbModels;
  action_text: string;
  actionable_type: EDbModels;
  //TODO IEvent | IHackathon | ICommunityBuild | ILab
  actionable: any;
  //TODO IUser | ICommunity
  performer: any;
}
