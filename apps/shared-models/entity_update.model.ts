import { IAttachedFile } from '@commudle/shared-models';
import { IUser } from './user.model';

export interface IEntityUpdate {
  id: number;
  event_id: number;
  user: IUser;
  details: string;
  created_at: Date;
  images: IAttachedFile[];
}
