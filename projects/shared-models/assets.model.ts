import { IAttachedFile } from './attached-file.model';

export interface assets {
  static_assets: static_assets[];
  page: number;
  count: number;
  total: number;
}

export interface static_assets {
  id: number;
  name: string;
  user_id: number;
  file: IAttachedFile;
}
