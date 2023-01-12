import { ICommunity } from './community.model';
import { IUser } from './user.model';
import { IEvent } from './event.model';

export interface IEventCollaborationCommunity {
  id: number;
  event: IEvent;
  approved: boolean;
  community: ICommunity;
  user: IUser;
}
