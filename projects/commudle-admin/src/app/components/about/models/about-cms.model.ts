import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface ICMSAbout {
  _id: string;
  title: string;
  header: {
    details: ICMSAboutBlock;
    links: ICMSAboutLink[];
  };
  tagline: string;
  features: ICMSAboutBlock[];
  testimonials: ICMSAboutBlock[];
  pricing: Array<{
    title: string;
    amount: number;
    description: {
      text: string;
      points: string[];
    };
    link: ICMSAboutLink;
  }>;
  download: {
    details: ICMSAboutBlock;
    links: ICMSAboutLink[];
  };
  contact: {
    content: string;
    email: string;
  };
}

interface ICMSAboutBlock {
  title: string;
  text: string;
  image: SanityImageObject;
}

interface ICMSAboutLink {
  text: string;
  url: string;
}
