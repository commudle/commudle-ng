import { IAttachedFile } from './attached-file.model';

export interface IPageAd {
  id: number;
  title: string;
  content: string;
  link: string;
  external_link: boolean;
  is_default: boolean;
  slot: string;
  iframe: string;
  created_at: Date;
  start_at: Date;
  end_at: Date;
  files: IAttachedFile[];
}
