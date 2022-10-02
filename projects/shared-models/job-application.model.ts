import { IJob } from './job.model';
import { IUser } from './user.model';
import { IUserResume } from './user_resume.model';

export enum EJobApplicationStatus {
  APPLIED = 'applied',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

export interface IJobApplication {
  id: number;
  user: IUser;
  job: IJob;
  user_resume: IUserResume;
  status: EJobApplicationStatus;
  created_at: Date;
}
