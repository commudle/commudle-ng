import { IPageInfo } from './page-info.model';

export interface IPagination<T> {
  page: Array<{ cursor: string; data: T[] }>;
  page_info: IPageInfo;
  total: number;
}
