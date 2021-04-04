import { ITag } from "./tag.model";

export interface IPost {
  id: number;
  content: string;
  tags: ITag[];
}
