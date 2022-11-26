import { IAttachedFile } from './attached-file.model';

enum EBadgeTypes {
  EXPERT = 'expert',
  AUTHOR = 'author',
}

export interface IBadge {
  // keeping id to any because it can be null
  id: number;
  name: string;
  image: IAttachedFile;
  slug: string;
  badge_type: EBadgeTypes;
}
