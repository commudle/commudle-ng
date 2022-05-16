import { ENotificationEntityTypes } from 'projects/shared-models/enums/notification_entity_types.enum';
import { ENotificationMessageTypes } from 'projects/shared-models/enums/notification_message_types.enum';
import { ENotificationParentTypes } from 'projects/shared-models/enums/notification_parent_types.enum';
import { INotification } from 'projects/shared-models/notification.model';

// A class for generating the notification message
export class NotificationMessageGeneration {
  // variable to hold the notification object
  private notification: INotification;

  // constructor to initialize the notification object
  constructor(notification: INotification) {
    this.notification = notification;
  }

  // method to switch on the notification message type
  public generateMessage(): string {
    switch (this.notification.notification_message_type) {
      case ENotificationMessageTypes.FOLLOW_CREATED:
        return this.generateFollowCreatedMessage();
      case ENotificationMessageTypes.VOTE_CREATED:
        return this.generateVoteCreatedMessage();
      case ENotificationMessageTypes.MESSAGE_CREATED:
        return this.generateMessageCreatedMessage();
    }
  }

  // method to generate the follow created message
  private generateFollowCreatedMessage(): string {
    return `${this.notification.sender.name} started following you`;
  }

  // method to generate the vote created message
  private generateVoteCreatedMessage(): string {
    // check the type of entity
    switch (this.notification.entity_type) {
      case ENotificationEntityTypes.LAB:
        return `${this.notification.sender.name} voted on your lab ${
          'name' in this.notification.entity ? `"${this.notification.entity.name}"` : ''
        }`;
      case ENotificationEntityTypes.COMMUNITY_BUILD:
        return `${this.notification.sender.name} voted on your community build ${
          'name' in this.notification.entity ? `"${this.notification.entity.name}"` : ''
        }`;
      case ENotificationEntityTypes.USER_MESSAGE:
        return `${this.notification.sender.name} voted on your message ${
          'content' in this.notification.entity
            ? `"${
                this.notification.entity.content.length > 20
                  ? this.notification.entity.content.substring(0, 20) + '...'
                  : this.notification.entity.content
              }"`
            : ''
        }`;
    }
  }

  // method to generate the message created message
  private generateMessageCreatedMessage(): string {
    // check the type of parent
    switch (this.notification.parent_type) {
      case ENotificationParentTypes.LAB:
        // check the type of entity
        switch (this.notification.entity_type) {
          case ENotificationEntityTypes.USER_MESSAGE:
            return `${this.notification.sender.name} replied to your message ${
              'content' in this.notification.entity
                ? `"${
                    this.notification.entity.content.length > 20
                      ? this.notification.entity.content.substring(0, 20) + '...'
                      : this.notification.entity.content
                  }"`
                : ''
            } in the lab ${'name' in this.notification.parent ? `"${this.notification.parent.name}"` : ''}`;
          default:
            return `${this.notification.sender.name} posted a message in the lab ${
              'name' in this.notification.parent ? `"${this.notification.parent.name}"` : ''
            }`;
        }
      case ENotificationParentTypes.COMMUNITY_BUILD:
        // check the type of entity
        switch (this.notification.entity_type) {
          case ENotificationEntityTypes.USER_MESSAGE:
            return `${this.notification.sender.name} replied to your message ${
              'content' in this.notification.entity
                ? `"${
                    this.notification.entity.content.length > 20
                      ? this.notification.entity.content.substring(0, 20) + '...'
                      : this.notification.entity.content
                  }"`
                : ''
            } in the community build ${'name' in this.notification.parent ? `"${this.notification.parent.name}"` : ''}`;
          default:
            return `${this.notification.sender.name} posted a message in the community build ${
              'name' in this.notification.parent ? `"${this.notification.parent.name}"` : ''
            }`;
        }
      default:
        return `${this.notification.sender.name} sent you a message`;
    }
  }
}
