import { IBadge } from './badge.model';
import { ITag } from './tag.model';

export interface IMiniUserProfile {
  id: number;
  username: string;
  name: string;
  avatar: string;
  is_expert: boolean;
  designation: string;
  followers_count: number;
  communities_count: number;
  tags: ITag[];
  badges: IBadge[];
}
