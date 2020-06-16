export interface IEventSimpleRegistration {
  id: number;
  status: string;
  event_id: number;
  user_event_registrations_count: number;
  current_user_registered: boolean;
}


export enum EEventSimpleRegistrationStatuses {
  CLOSED = 'closed',
  OPEN = 'open'
}
