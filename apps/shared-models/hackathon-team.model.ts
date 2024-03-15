import { IRound, ICommunityBuild, INote } from '@commudle/shared-models';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import { IHackathonWinner } from 'apps/shared-models/hackathon-winner.model';

export interface IHackathonTeam {
  id: number;
  name: string;
  slug: string;
  created_at: Date;
  registration_status: EHackathonRegistrationStatus;
  round?: IRound;
  community_build?: ICommunityBuild;
  entity_updates?: IEventUpdate[];
  notes: INote[];
  hackathon_winners: IHackathonWinner[];
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
