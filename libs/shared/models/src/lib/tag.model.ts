import { IAttachedFile } from './attached-file.model';

export interface ITag {
  id: number;
  name: string;
  object_count?: number;
  category?: string;
  color?: string;
  picture?: IAttachedFile;
}
