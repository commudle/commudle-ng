import { IJobApplication } from './job-application.model';

export interface IJobApplications {
  job_applications: IJobApplication[];
  page: number;
  count: number;
  total: number;
}
