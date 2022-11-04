import { IJob } from './job.model';
import { IPageInfo } from './page-info.model';

export interface IJobs {
  page: Array<{ cursor: string; data: IJob[] }>;
  page_info: IPageInfo;
  total: number;
}
