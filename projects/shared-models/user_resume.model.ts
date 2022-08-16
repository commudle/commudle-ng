import { IAttachedFile } from './attached-file.model';

export interface IUserResume {
  id: number;
  name: string;
  uuid: string;
  resume: IAttachedFile;
  updated_at: Date;
}
