export interface IRegistrationType {
  id: number;
  name: RegistrationTypeNames;
}

export enum RegistrationTypeNames {
  ATTENDEE = "attendee",
  SPEAKER = "speaker",
  FEEDBACK = "feedback",
  COMMUNICATION = "communication",
}
