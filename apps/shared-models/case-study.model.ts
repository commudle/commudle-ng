import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { IAttachedFile } from 'apps/shared-models/attached-file.model';

export interface ICaseStudy {
  title: string;
  tagline: string;
  slug: { current: string };
  bannerImage: IAttachedFile;
  metaDescription: string;
  header_image: SanityImageObject;
  stats: [];
  testimonials: [];
  logoImage: SanityImageObject;
}
