import { Component, OnDestroy, OnInit } from '@angular/core';
import { NotificationService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification.service';
import { NotificationChannel } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/websockets/notification-channel';
import { ENotificationStatus } from 'projects/shared-models/enums/notification_status.enum';
import { INotification } from 'projects/shared-models/notification.model';
import { Subscription } from 'rxjs';
import { NotificationStateService } from 'projects/commudle-admin/src/app/feature-modules/notifications/services/notification-state.service';
import { ENotificationMessageType } from 'projects/shared-models/enums/notification_message_type.enum';
import { ENotificationEntityType } from 'projects/shared-models/enums/notification_entity_type.enum';
import { ICommunityBuild } from 'projects/shared-models/community-build.model';
import { ILab } from 'projects/shared-models/lab.model';

@Component({
  selector: 'app-notifications-popover',
  templateUrl: './notifications-popover.component.html',
  styleUrls: ['./notifications-popover.component.scss'],
})
export class NotificationsPopoverComponent implements OnInit, OnDestroy {
  notifications: INotification[] = [];

  page = 1;
  count = 10;

  ENotificationStatus = ENotificationStatus;

  subscriptions: Subscription[] = [];

  isLoading = false;

  constructor(
    private notificationChannel: NotificationChannel,
    private notificationService: NotificationService,
    private notificationStateService: NotificationStateService,
  ) { }

  ngOnInit(): void {
    this.notificationStateService.setNotificationPopoverState(true);
    this.getNotifications();
    this.receiveData();
  }

  ngOnDestroy(): void {
    this.notificationStateService.setNotificationPopoverState(false);
    this.subscriptions.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

  getNotifications() {
    this.isLoading = true;
    this.subscriptions.push(
      this.notificationService.getAllNotifications(this.page, this.count).subscribe((value) => {
        let notifications = value.notifications.reverse();
        notifications.forEach((notification) => {
          notification.notification_message = this.generateNotificationMessage(notification);
        })
        this.notifications = this.notifications.concat(notifications);
        this.isLoading = false;
      }),
    );
  }

  receiveData() {
    this.subscriptions.push(
      this.notificationChannel.notificationData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case this.notificationChannel.ACTIONS.NEW_NOTIFICATION: {
              data.notification.notification_message = this.generateNotificationMessage(data.notification);
              this.notifications.unshift(data.notification);
              break;
            }
            case this.notificationChannel.ACTIONS.STATUS_UPDATE: {
              const idx = this.notifications.findIndex(
                (notification) => notification.id === data.notification_queue_id,
              );
              if (idx != -1) {
                this.notifications[idx].status = data.status;
              }
            }
          }
        }
      }),
    );
  }

  closePopover() {
    this.notificationStateService.setCloseNotificationPopover(true);
  }

  generateNotificationMessage(notification: INotification): string {

    let notification_message: string = "";

    switch (notification.notification_message_type) {

      case ENotificationMessageType.FOLLOW_CREATED: {
        notification_message = `${notification.sender.name} has started following you`;
        break;
      }

      case ENotificationMessageType.VOTE_CREATED: {

        switch (notification.entity_type) {
          case ENotificationEntityType.COMMUNITY_BUILD: {
            notification_message = `Your Project on '${(notification.entity as ICommunityBuild).name}' has been liked by ${notification.sender.name}`
            break;
          }
          case ENotificationEntityType.LAB: {
            notification_message = `Your Tutorial on '${(notification.entity as ILab).name}' has been liked by ${notification.sender.name}`
            break;
          }
          // TODO: implement liking a message when backend code is done.
        }

        break;
      }

      case ENotificationMessageType.MESSAGE_CREATED: {

        if (notification.entity_type.includes(ENotificationMessageType.REPLY)) {
          //TODO: Identify the parent type here (whether it's a reply on lab, build or message)
          notification_message = `${notification.sender.name} replied to your comment`
        }
        else {
          switch (notification.entity_type) {
            case ENotificationEntityType.COMMUNITY_BUILD: {
              notification_message = `${notification.sender.name} has commented on your Project on '${(notification.entity as ICommunityBuild).name}'`
              break;
            }
            case ENotificationEntityType.LAB: {
              notification_message = `${notification.sender.name} has commented on your Tutorial on '${(notification.entity as ILab).name}'`
              break;
            }
            case ENotificationEntityType.USER: {
              notification_message = `${notification.sender.name} has messaged you`
              break;
            }
          }
        }

        break;
      }
    }

    return notification_message;
  }
}
