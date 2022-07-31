import { SanityImageObject } from '@sanity/image-url/lib/types/types';

export interface ICMSAbout {
  _id: string;
  title: string;
  slug: string;
  description: string;
  landingImage: SanityImageObject;
  stats: ICMSAboutStat[];
  features: ICMSAboutBlock[];
  team: ICMSAboutTeam[];
  featuresList: {
    content: {
      title: string;
      description: string;
      button: ICMSAboutLink;
    };
    list: string[];
  };
}

interface ICMSAboutBlock {
  title: string;
  description: string;
  image: SanityImageObject;
  button: ICMSAboutLink;
}

interface ICMSAboutLink {
  text: string;
  url: string;
}

interface ICMSAboutStat {
  count: string;
  title: string;
  description: string;
}

interface ICMSAboutTeam {
  name: string;
  designation: string;
  image: SanityImageObject;
  social: {
    twitter: string;
    linkedin: string;
    commudle: string;
  };
}
