import { EDbModels } from './db-models.enum';

export interface IActivityFeed {
  token: string;
  performer_type: EDbModels;
  action_text: string;
  //TODO IEvent | IHackathon | ICommunityBuild | ILab
  actionable_type: EDbModels;
  actionable: any;
  performer: any;
}
