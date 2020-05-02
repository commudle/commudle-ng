import { ICommunity } from './community.model';
import { IUser } from './user.model';

export interface IEventCollaborationCommunity {
  id: number;
  event_id: number;
  approved: boolean;
  community: ICommunity;
  user: IUser;
}
