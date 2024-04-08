import { ICommunityBuild } from './community-build.model';
import { IRound } from './round.model';
import { INote } from './note.model';
import { IEntityUpdate } from './entity-update.model';
import { IHackathonWinner } from './hackathon-winner.model';

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
  prize_selected: boolean; //use for display only not related to API requests
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
