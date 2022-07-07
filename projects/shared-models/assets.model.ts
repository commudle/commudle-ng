import { IAttachedFile } from './attached-file.model';

export interface IStaticAssets {
  static_assets: IStaticAsset[];
  page: number;
  count: number;
  total: number;
}

export interface IStaticAsset {
  id: number;
  name: string;
  user_id: number;
  file: IAttachedFile;
}
