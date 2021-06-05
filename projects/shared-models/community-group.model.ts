import { IAttachedFile } from './attached-file.model';
export interface ICommunityGroup {
  id: number;
  name: string;
  description: string;
  slug: string;
  is_visible?: boolean;
  facebook: string;
  github: string;
  twitter: string;
  website: string;
  linkedin: string;
  logo: IAttachedFile;
}
