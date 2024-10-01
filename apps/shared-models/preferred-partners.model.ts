import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface IPreferredPartners {
  name: string;
  slug: string;
  description: string;
  link: string;
  image: SanityImageObject;
}
