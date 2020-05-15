import { IUser } from './user.model';

export interface IEmbeddedVideoStream {
  id: number;
  source: string;
  streamable_type: string;
  streamable_id: number;
  embed_code: string;
  user: IUser;
}
