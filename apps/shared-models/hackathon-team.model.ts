import { IRound, ICommunityBuild, INote } from '@commudle/shared-models';
import { IEventUpdate } from 'apps/shared-models/event_update.model';

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
}

export enum EHackathonRegistrationStatus {
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
  REGISTERED = 'registered',
  WAITLISTED = 'waitlisted',
}

export enum EHackathonRegistrationStatusColor {
  accepted = 'com-bg-green-500',
  rejected = 'com-bg-red-500',
  registered = 'com-bg-primary-500',
  waitlisted = 'com-bg-orange-400',
}
