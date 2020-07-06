import { IUser } from './user.model';

export interface CommunityBuild {
  id: number;
  user: IUser;
  name: string;
  description: string;
  build_type: string;
  project_status: string;
  publish_status: string;
  link: string;
  contact: string;
  open_source: boolean;
  need_team: boolean;
  created_at: Date;
  images: string[];
  tags: string[];
}
