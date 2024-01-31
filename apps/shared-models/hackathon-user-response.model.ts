import { IUser } from './user.model';

export interface IHackathonUserResponse extends IUser {
  id: number;
  user_id: number;
  hackathon_response_group_id: number;
  hackathon_team_id: any;
  education: string;
}
