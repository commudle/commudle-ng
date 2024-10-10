import { IHackathonTeam, IHackathonUserResponse } from '@commudle/shared-models';

export interface IHackathonUserResponses {
  team: IHackathonTeam;
  user_responses: IHackathonUserResponse[];
}
