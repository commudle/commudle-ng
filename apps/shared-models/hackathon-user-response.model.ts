import { IUser } from './user.model';

export interface IHackathonUserResponse extends IUser {
  id: number;
  user_id: number;
  hackathon_response_group_id: number;
  hackathon_team_id: number;
  education: string;
  track_id: number;
  project_description: string;
  user_email: string;
  invite_status: EInvitationStatus;
}

export enum EInvitationStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  SELF_CREATED = 'self_created',
  REJECTED = 'rejected',
  APPLICATION_COMPLETE = 'application_complete',
}
