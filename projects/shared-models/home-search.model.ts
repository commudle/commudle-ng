import {ICommunity} from './community.model';
import {ICommunityBuild} from './community-build.model';
import {ILab} from './lab.model';
import {IUser} from './user.model';
import {IEvent} from './event.model';

export interface IHomeSearch {
  builds: ICommunityBuild[];
  communities: ICommunity[];
  events: IEvent[];
  labs: ILab[];
  users: IUser[];
}
