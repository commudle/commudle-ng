import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface IPrivacy {
  title: string;
  slug: { current: string };
  meta_description: string;
  last_updated_at: Date;
  headerImage: SanityImageObject;
  content: [];
}
