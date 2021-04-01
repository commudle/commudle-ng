import { IAttachedFile } from "./attached-file.model";

export interface ISocialResource {
  title: string;
  description: string;
  favicon: string;
  image: IAttachedFile;
}
