import { ICommunityBuild } from './community-build.model';
import { IRound } from './round.model';
import { INote } from './note.model';
import { IEntityUpdate } from './entity-update.model';
import { IHackathonWinner } from './hackathon-winner.model';
import { ICommunity } from './community.model';
import { IHackathon } from './hackathon.model';

export interface IHackathonTeam {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  registration_status: EHackathonRegistrationStatus;
  round?: IRound;
  community_build?: ICommunityBuild;
  entity_updates?: IEntityUpdate[];
  notes: INote[];
  hackathon_winners: IHackathonWinner[];
  hackathon_id: number;
  acceptance_mail_sent: boolean;
  prize_selected: boolean; //use for display only not related to API requests
  hackathon: IHackathon;
  community: ICommunity;
}

export enum EHackathonRegistrationStatus {
  REGISTERED = 'registered',
  WAITLISTED = 'waitlisted',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export enum EHackathonRegistrationStatusColor {
  registered = 'com-bg-primary-500',
  waitlisted = 'com-bg-orange-400',
  accepted = 'com-bg-green-500',
  rejected = 'com-bg-red-500',
}
