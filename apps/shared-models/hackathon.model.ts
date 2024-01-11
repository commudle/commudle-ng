import { IAttachedFile } from '@commudle/shared-models';

export interface IHackathon {
  id: number;
  name: string;
  slug: string;
  description: string;
  hackathon_theme: string;
  participate_types: string;
  tagline: string;
  number_of_participants: number;
  banner_image: IAttachedFile;
  start_date: Date;
  end_date: Date;
  application_start_date: Date;
  application_end_date: Date;
  time_zone: string;
  created_at: Date;
}

export enum EParticipateTypes {
  both = 'Both',
  team = 'Team',
  individual = 'Individual',
}
