import { IHackathonTeam } from '@commudle/shared-models';
import { IHackathonUserResponse } from './hackathon-user-response.model';

export interface IHackathonUserResponses {
  team: IHackathonTeam;
  user_responses: IHackathonUserResponse[];
}
