import { ITag } from './tag.model';

export interface ITags {
  tags: ITag[];
  page: string;
  count: number;
  total: number;
}
