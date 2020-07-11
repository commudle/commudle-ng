import { IEventStatus } from './event_status.model';

export interface IEvent {
  id: number;
  name: string;
  header_image_path: string;
  description: string;
  start_time: Date;
  end_time: Date;
  kommunity_id: number;
  created_at: Date;
  user: string;
  slug: string;
  event_status: IEventStatus;
  seats: number;
  timezone: string;
  custom_registration: boolean;
  custom_agenda: boolean;
  editable: boolean;
}
