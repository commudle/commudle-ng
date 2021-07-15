import {IAttachedFile} from './attached-file.model';
import {ITag} from './tag.model';

export interface ICommunity {
  id: number;
  name: string;
  logo_path: string;
  logo_image: IAttachedFile;
  about: string;
  slug: string;
  mini_description: string;
  contact_email: string;
  facebook: string;
  github: string;
  twitter: string;
  website: string;
  linkedin: string;
  member_count: number;
  event_count: number;
  location: string;
  tags: ITag[];
}
