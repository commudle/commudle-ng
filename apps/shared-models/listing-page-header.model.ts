import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface IListingPageHeader {
  background_color: { hex: string };
  header_image: SanityImageObject;
  title: string;
  sub_title: string;
  slug: { current: string };
}
