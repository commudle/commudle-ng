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
  profile_image?: IAttachedFile;
  invite_status: EInvitationStatus;
}

export enum EInvitationStatus {
  INVITED = 0,
  ACCEPTED = 1,
  REMOVED = 2,
  REJECTED = 3,
}
