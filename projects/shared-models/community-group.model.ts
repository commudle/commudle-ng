import { IAttachedFile } from './attached-file.model';
export interface ICommunityGroup {
  id: number;
  name: string;
  description: string;
  slug: string;
  logo: IAttachedFile;
}
