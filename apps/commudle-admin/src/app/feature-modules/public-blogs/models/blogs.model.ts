import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface IBlog {
  _id: string;
  slug: any;
  title: string;
  username: string;
  publishedAt: Date;
  headerImage: SanityImageObject;
  meta_description: string;
  content: [];
}
