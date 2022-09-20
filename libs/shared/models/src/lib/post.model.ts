import { IAttachedFile } from './attached-file.model';
import { ITag } from './tag.model';
import { IUser } from './user.model';

export interface IPost {
  id?: number;
  content: string;
  images?: IAttachedFile[];
  tags: ITag[];
  votes_count: number;
  user: IUser;
}
