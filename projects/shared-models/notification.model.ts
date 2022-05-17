import { ENotificationEntityTypes } from 'projects/shared-models/enums/notification_entity_types.enum';
import { ENotificationMessageTypes } from 'projects/shared-models/enums/notification_message_types.enum';
import { ENotificationParentTypes } from 'projects/shared-models/enums/notification_parent_types.enum';
import { ENotificationSenderTypes } from 'projects/shared-models/enums/notification_sender_types.enum';
import { ENotificationStatuses } from 'projects/shared-models/enums/notification_statuses.enum';
import { ICommunityBuild } from './community-build.model';
import { ILab } from './lab.model';
import { IUser } from './user.model';
import { IUserMessage } from './user_message.model';

export interface INotification {
  id: number;
  status: ENotificationStatuses;
  sender: IUser;
  sender_type: ENotificationSenderTypes;
  entity: IUser | ILab | ICommunityBuild | IUserMessage;
  entity_type: ENotificationEntityTypes;
  parent: ILab | ICommunityBuild;
  parent_type: ENotificationParentTypes;
  notification_message: string;
  notification_message_type: ENotificationMessageTypes;
  created_at: string;
}
