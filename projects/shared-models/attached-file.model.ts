export interface IAttachedFile {
  // keeping id to any because it can be null
  id: any;
  url: string;
  file: File;
  name?: string;
  type?: string;
  profile_banner?: string;
  medium?: string;
  i24?: string;
  i32?: string;
  i48?: string;
  i64?: string;
  i96?: string;
  i350?: string;
}


