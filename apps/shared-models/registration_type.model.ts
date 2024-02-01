export interface IRegistrationType {
  id: number;
  name: any;
}

export enum RegistrationTypeNames {
  ATTENDEE = 'attendee',
  SPEAKER = 'speaker',
  FEEDBACK = 'feedback',
  COMMUNICATION = 'communication',
}

export enum RegistrationTypeBackgroundColor {
  attendee = '#DDE7F3',
  speaker = '#DDDFF4',
  feedback = '#EFE0DB',
  communication = '#ffff',
}
