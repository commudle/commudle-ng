import { IAttachedFile } from '@commudle/shared-models';

export interface IHackathonJudge {
  id: number;
  name: string;
  about: string;
  company: string;
  email: string;
  linkedin: string;
  twitter: string;
  website: string;
  designation: string;
  username: string;
  judge_user_id: number;
  profile_image?: IAttachedFile;
  invite_status: EInvitationStatus;
  judge_type: EHackathonJudgeType;
}

export enum EInvitationStatus {
  INVITED = 'invited',
  ACCEPTED = 'accepted',
  REMOVED = 'removed',
  REJECTED = 'rejected',
}

export enum EHackathonJudgeType {
  JUDGE = 'judge',
  SPEAKER = 'speaker',
  MENTOR = 'mentor',
}
