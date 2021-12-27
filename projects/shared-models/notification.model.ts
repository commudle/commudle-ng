import { ICommunityBuild } from './community-build.model';
import { ILab } from './lab.model';
import { IUser } from './user.model';
import { IUserMessage } from './user_message.model';

export interface INotification {
  entity: IUser | ILab | ICommunityBuild | IUserMessage;
  sender: IUser;
  id: string;
  notification_message: string;
  status: string;
}
