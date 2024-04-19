import { IAttachedFile } from './attached-file.model';
export interface IFeaturesModel {
  slug: any;
  image: IAttachedFile[];
  title: string;
  features: [];
  description: string;
}
