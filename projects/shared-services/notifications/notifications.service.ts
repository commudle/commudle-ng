import { Injectable } from '@angular/core';
import { CommunityChannelNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { UserChatNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { DesktopNotificationsService } from 'projects/shared-services/notifications/desktop-notifications.service';
import { SessionPageNotificationsService } from 'projects/shared-services/session-page-notifications.service';
import { Subscription } from 'rxjs';
import { TabTitleNotificationsService } from './tab-title-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private subscriptions: Subscription[] = [];

  constructor(
    private tabTitleNotificationsService: TabTitleNotificationsService,
    private desktopNotificationsService: DesktopNotificationsService,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
    private communityChannelNotificationsChannel: CommunityChannelNotificationsChannel,
    private sessionPageNotificationsService: SessionPageNotificationsService,
  ) {}

  /**
   * subscribes to all the notifications from backend for displaying in the tab title
   * Disabled for now till we are able to sync it with push notifications
   */
  subscribeToNotifications(): void {
    // this.showPersonalChatNotification();
    // this.showChannelNotification();
    // this.showSessionPageNotification();
  }

  unsubscribeFromNotifications(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private showPersonalChatNotification(): void {
    this.subscriptions.push(
      this.userChatNotificationsChannel.newMessagesCounter$.subscribe((value: IDiscussionFollower[]) => {
        if (value.length > 0) {
          this.tabTitleNotificationsService.blinkTitle(`New personal message from ${value[0].user.name}!`);
          this.desktopNotificationsService.showNotification(
            'New personal message',
            `You have a new personal message from ${value[0].user.name}!`,
          );
        }
      }),
    );
  }

  private showChannelNotification(): void {
    this.subscriptions.push(
      this.communityChannelNotificationsChannel.hasNotifications$.subscribe((value: boolean) => {
        if (value) {
          this.tabTitleNotificationsService.blinkTitle(`New channel message!`);
          this.desktopNotificationsService.showNotification(
            'New channel message',
            `You have a new message in a channel you are following!`,
          );
        }
      }),
    );
  }

  private showSessionPageNotification(): void {
    this.subscriptions.push(
      this.sessionPageNotificationsService.newChat$.subscribe((value: boolean) => {
        if (value) {
          this.tabTitleNotificationsService.blinkTitle(`New chat on session page!`);
          this.desktopNotificationsService.showNotification(
            'New chat on session page',
            `You have a new chat on the session you are attending!`,
          );
        }
      }),
      this.sessionPageNotificationsService.newQna$.subscribe((value: boolean) => {
        if (value) {
          this.tabTitleNotificationsService.blinkTitle(`New Q&A on session page!`);
          this.desktopNotificationsService.showNotification(
            'New Q&A on session page',
            `You have a new Q&A on the session you are attending!`,
          );
        }
      }),
    );
  }
}
