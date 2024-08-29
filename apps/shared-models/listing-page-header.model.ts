import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface IListingPageHeader {
  background_color: { hex: string };
  header_image: SanityImageObject;
  title: string;
  heading: string;
  sub_heading: string;
  slug: { current: string };
  content: [];
  image_link?: string;
  background_image: SanityImageObject;
}
