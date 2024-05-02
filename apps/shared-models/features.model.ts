import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface IFeature {
  slug: any;
  image: SanityImageObject;
  title: string;
  features: [];
  description: string;
  icon: SanityImageObject;
}
