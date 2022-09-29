import { IJob } from './job.model';

export interface IJobs {
  jobs: IJob[];
  page: number;
  count: number;
  total: number;
}
