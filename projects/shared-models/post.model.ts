import { IAttachedFile } from "./attached-file.model";
import { ITag } from "./tag.model";

export interface IPost {
  id?: number;
  content: string;
  images?: IAttachedFile[];
  tags: ITag[];
}
