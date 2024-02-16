import { IHackathonTeam } from './hackathon-team.model';
import { IHackathonUserResponse } from './hackathon-user-response.model';

export interface IHackathonUserResponses {
  team: IHackathonTeam;
  user_responses: IHackathonUserResponse[];
}
