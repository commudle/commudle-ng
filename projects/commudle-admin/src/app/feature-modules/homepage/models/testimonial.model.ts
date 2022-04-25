import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface ITestimonial {
  id: number;
  name: string;
  designation: string;
  username: string;
  avatar: SanityImageObject;
  shortContent: string;
  longContent: string;
  contributions: Array<{ content: string }>;
}
