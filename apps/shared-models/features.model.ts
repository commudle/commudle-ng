import { IAttachedFile } from './attached-file.model';
export interface IFeaturesModel {
  slug: any;
  image: any;
  // image: IAttachedFile[];
  title: string;
  features: [];
  description: string;
}
