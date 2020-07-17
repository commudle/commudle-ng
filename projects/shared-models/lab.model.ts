import { IAttachedFile } from './attached-file.model';
import { IUser } from './user.model';

export interface ILab {
  id: number;
  name: string;
  description: string;
  header_image: IAttachedFile;
  user: IUser;
  publish_status: string;
  created_at: Date;
}
