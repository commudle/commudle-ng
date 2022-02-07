import { ICommunityBuild } from './community-build.model';
import { ENotificationEntityType } from './enums/notification_entity_type.enum';
import { ENotificationMessageType } from './enums/notification_message_type.enum';
import { ENotificationSenderType } from './enums/notification_sender_type.enum';
import { ENotificationStatus } from './enums/notification_status.enum';
import { ILab } from './lab.model';
import { IUser } from './user.model';
import { IUserMessage } from './user_message.model';

export interface INotification {
  created_at: Date;
  entity: IUser | ILab | ICommunityBuild | IUserMessage;
  entity_type: ENotificationEntityType;
  id: string;
  notification_message: string;
  notification_message_type: ENotificationMessageType;
  sender: IUser;
  sender_type: ENotificationSenderType;
  status: ENotificationStatus;
}
