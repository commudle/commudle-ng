import { IAttachedFile } from "./attached-file.model";

export interface IBadge {
  // keeping id to any because it can be null
  id: number;
  name: string;
  type: string;
  image: IAttachedFile

}

