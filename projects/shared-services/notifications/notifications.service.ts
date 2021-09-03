import { Injectable } from '@angular/core';
import { UserChatNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { TabTitleNotificationsService } from './tab-title-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(
    private tabTitleNotificationsService: TabTitleNotificationsService,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
  ) {}

  subscribeToNotifications(): void {
    this.showUnreadChatNotificationsCount();
  }

  private showUnreadChatNotificationsCount() {
    this.userChatNotificationsChannel.newMessagesCounter$.subscribe((value: IDiscussionFollower[]) => {
      if (value.length > 0) {
        this.tabTitleNotificationsService.blinkTitle(`New message from ${value[0].user.name}`);
      }
    });
  }
}
