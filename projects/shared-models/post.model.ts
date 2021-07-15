import { IUser } from 'projects/shared-models/user.model';
import { IAttachedFile } from './attached-file.model';
import { ITag } from './tag.model';

export interface IPost {
  id?: number;
  content: string;
  images?: IAttachedFile[];
  tags: ITag[];
  votes_count: number;
  user: IUser;
}
