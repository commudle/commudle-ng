import { IAttachedFile } from './attached-file.model';

export interface ISponsor {
  id: number;
  name: string;
  link: string;
  logo: IAttachedFile;
}
