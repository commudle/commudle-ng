import { IAttachedFile } from "./attached-file.model";
import { EBadgeTypes } from "./badge_types.enum";
export interface IBadge {
  // keeping id to any because it can be null
  id: number;
  name: string;
  image: IAttachedFile
  slug: string;
  badge_type: EBadgeTypes;
}

