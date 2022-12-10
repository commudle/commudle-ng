import { ENotificationEntityTypes } from 'apps/shared-models/enums/notification_entity_types.enum';
import { ENotificationMessageTypes } from 'apps/shared-models/enums/notification_message_types.enum';
import { ENotificationParentTypes } from 'apps/shared-models/enums/notification_parent_types.enum';
import { ENotificationSenderTypes } from 'apps/shared-models/enums/notification_sender_types.enum';
import { ENotificationStatuses } from 'apps/shared-models/enums/notification_statuses.enum';
import { ICommunityBuild } from './community-build.model';
import { ICommunity } from './community.model';
import { ILab } from './lab.model';
import { IUser } from './user.model';
import { IUserMessage } from './user_message.model';

type OnlyOne<T, U> = T | U extends object
  ? (Pick<T, Exclude<keyof T, keyof U>> & U) | (Pick<U, Exclude<keyof U, keyof T>> & T)
  : T | U;
export interface INotification {
  id: number;
  status: ENotificationStatuses;
  sender: OnlyOne<IUser, ICommunity>;
  sender_type: ENotificationSenderTypes;
  notification_message: INotificationMessage[];
  notification_message_type: ENotificationMessageTypes;
  created_at: string;
}

export interface INotificationMessage {
  type: 'link' | 'text' | 'href';
  value: string;
  href: string;
  sender: OnlyOne<IUser, ICommunity>;
  sender_type: ENotificationSenderTypes;
  entity: ILab | ICommunityBuild | IUserMessage;
  entity_type: ENotificationEntityTypes;
  parent: ILab | ICommunityBuild;
  parent_type: ENotificationParentTypes;
}
