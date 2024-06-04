import { SanityImageObject } from '@sanity/image-url/lib/types/types';
import { IAttachedFile } from 'apps/shared-models/attached-file.model';
import { ITestimonial } from 'apps/shared-models/testimonial.model';

export interface ICaseStudy {
  title: string;
  tagline: string;
  slug: { current: string };
  bannerImage: IAttachedFile;
  metaDescription: string;
  header_image: SanityImageObject;
  stats: [];
  testimonials: ITestimonial[];
  logoImage: SanityImageObject;
  challenge: [];
  solution: [];
}
