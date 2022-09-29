export interface IJob {
  id: number;
  position: string;
  company: string;
  category: EJobCategory;
  experience: number;
  min_salary: number;
  max_salary: number;
  salary_type: EJobSalaryType;
  salary_currency: EJobSalaryCurrency;
  location_type: EJobLocationType;
  location: string;
  job_type: EJobType;
  status: EJobStatus;
  description: string;
  updated_at: string;
}

export enum EJobCategory {
  JOB = 'job',
  INTERNSHIP = 'internship',
}

export enum EJobSalaryType {
  HOURLY = 'hourly',
  MONTHLY = 'monthly',
  YEARLY = 'yearly',
}

export enum EJobSalaryCurrency {
  INR = 'inr',
  USD = 'usd',
  EUR = 'eur',
}

export enum EJobLocationType {
  REMOTE = 'remote',
  LOCAL = 'local',
}

export enum EJobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
}

export enum EJobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}
