import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface ITestimonial {
  id: number;
  name: string;
  username: string;
  avatar: SanityImageObject;
  content: string;
  projects: number;
  events: number;
}
