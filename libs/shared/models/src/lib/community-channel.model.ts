import { IAttachedFile } from './attached-file.model';
import { IUser } from './user.model';

export interface ICommunityChannel {
  id: number;
  user: IUser;
  kommunity_id: number;
  name: string;
  description: string;
  group_name: string;
  join_token: string;
  is_private: boolean;
  is_readonly: boolean;
  logo: IAttachedFile;
  my_roles: any[];
  member_count: number;
  messages_count?: number;
  display_type: string;
  messages_count_in_three_months?: number;
  kommunity?: {
    id: number;
    name: string;
  };
}

export interface ICommunityChannels {
  community_channels: ICommunityChannel[];
}

export enum EDiscussionType {
  CHANNEL = 'channel',
  FORUM = 'forum',
}
