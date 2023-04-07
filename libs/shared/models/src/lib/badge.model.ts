import { IAttachedFile } from './attached-file.model';

enum EBadgeTypes {
  EXPERT = 'expert',
  AUTHOR = 'author',
}

export interface IBadge {
  id: number;
  name: string;
  image: IAttachedFile;
  slug: string;
  badge_type: EBadgeTypes;
}
