import { ICommunityBuild } from './community-build.model';
import { ENotificationStatus } from './enums/notification_status.enum';
import { ILab } from './lab.model';
import { IUser } from './user.model';
import { IUserMessage } from './user_message.model';

export interface INotification {
  created_at: Date;
  entity: IUser | ILab | ICommunityBuild | IUserMessage;
  entity_type: string;
  id: string;
  notification_message: string;
  notification_message_type: string;
  sender: IUser;
  sender_type: string;
  status: ENotificationStatus;
}
