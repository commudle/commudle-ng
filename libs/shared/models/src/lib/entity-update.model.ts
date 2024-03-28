import { IUser } from './user.model';
import { IAttachedFile } from './attached-file.model';

export interface IEntityUpdate {
  id: number;
  event_id: number;
  user: IUser;
  details: string;
  created_at: Date;
  images: IAttachedFile[];
}
