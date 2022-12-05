export interface IRegistrationType {
  id: number;
  name: any;
}

export enum RegistrationTypeNames {
  ATTENDEE = "attendee",
  SPEAKER = "speaker",
  FEEDBACK = "feedback",
  COMMUNICATION = "communication",
}
