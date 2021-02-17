export interface IAttachedFile {
  // keeping id to any because it can be null
  id: any;
  url: string;
  file: File;
  name?: string;
  type?: string;
  profile_banner?: string;
  medium?: string;
  small?: string;
  thumbnail?: string;
}


