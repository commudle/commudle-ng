import {IAttachedFile} from './attached-file.model';
import {ITag} from 'projects/shared-models/tag.model';

export interface ISocialResource {
  id: number;
  link: string;
  title: string;
  description: string;
  display_order: number;
  favicon: string;
  image: IAttachedFile;
  tags: ITag[];
}
