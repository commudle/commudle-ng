import { IUser } from './user.model';
import { ITag } from './tag.model';

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
  created_at: string;
  expired_at: string;
  user: IUser;
  tags: ITag[];
  job_applications_count: number;
}

export enum EJobCategory {
  JOB = 'job',
  INTERNSHIP = 'internship',
  FREELANCE = 'freelance',
  VOLUNTEER = 'volunteer_unpaid',
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
  OFFICE = 'office',
  FLEXIBLE = 'flexible',
}

export enum EJobType {
  FULL_TIME = 'full_time',
  PART_TIME = 'part_time',
}

export enum EJobStatus {
  OPEN = 'open',
  CLOSED = 'closed',
}
