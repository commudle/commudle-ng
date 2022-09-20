import { ICommunityBuild } from './community-build.model';
import { ENotificationEntityTypes } from './enums/notification_entity_types.enum';
import { ENotificationMessageTypes } from './enums/notification_message_types.enum';
import { ENotificationParentTypes } from './enums/notification_parent_types.enum';
import { ENotificationSenderTypes } from './enums/notification_sender_types.enum';
import { ENotificationStatuses } from './enums/notification_statuses.enum';
import { ILab } from './lab.model';
import { IUser } from './user.model';
import { IUserMessage } from './user_message.model';

export interface INotification {
  id: number;
  status: ENotificationStatuses;
  sender: IUser;
  notification_message: INotificationMessage[];
  notification_message_type: ENotificationMessageTypes;
  created_at: string;
}

export interface INotificationMessage {
  type: 'link' | 'text';
  value: string;
  sender: IUser;
  sender_type: ENotificationSenderTypes;
  entity: ILab | ICommunityBuild | IUserMessage;
  entity_type: ENotificationEntityTypes;
  parent: ILab | ICommunityBuild;
  parent_type: ENotificationParentTypes;
}
