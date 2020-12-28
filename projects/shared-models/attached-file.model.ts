export interface IAttachedFile {
  // keeping id to any because it can be null
  id: any;
  url: string;
  file: File;
  name: string;
  type: string;
}
