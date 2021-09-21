import { Injectable } from '@angular/core';
import { CommunityChannelNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { UserChatNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/user-chats/services/websockets/user-chat-notifications.channel';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';
import { Subscription } from 'rxjs';
import { SessionPageNotificationsService } from '../session-page-notifications.service';
import { TabTitleNotificationsService } from './tab-title-notifications.service';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  private subscriptions: Subscription[] = [];

  constructor(
    private tabTitleNotificationsService: TabTitleNotificationsService,
    private userChatNotificationsChannel: UserChatNotificationsChannel,
    private communityChannelNotificationsChannel: CommunityChannelNotificationsChannel,
    private sessionPageNotificationsService: SessionPageNotificationsService,
  ) {}

  subscribeToNotifications(): void {
    this.showPersonalChatNotification();
    this.showChannelNotification();
    this.showSessionPageNotification();
  }

  unsubscribeFromNotifications(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  private showPersonalChatNotification(): void {
    this.subscriptions.push(
      this.userChatNotificationsChannel.newMessagesCounter$.subscribe((value: IDiscussionFollower[]) => {
        if (value.length > 0) {
          this.tabTitleNotificationsService.blinkTitle(`New personal message from ${value[0].user.name}!`);
        }
      }),
    );
  }

  private showChannelNotification(): void {
    this.subscriptions.push(
      this.communityChannelNotificationsChannel.hasNotifications$.subscribe((value: boolean) => {
        if (value) {
          this.tabTitleNotificationsService.blinkTitle(`New channel message!`);
        }
      }),
    );
  }

  private showSessionPageNotification(): void {
    this.subscriptions.push(
      this.sessionPageNotificationsService.newChat$.subscribe((value: boolean) => {
        if (value) {
          console.log(`New chat notification!`);
          this.tabTitleNotificationsService.blinkTitle(`New chat on session page!`);
        }
      }),
      this.sessionPageNotificationsService.newQna$.subscribe((value: boolean) => {
        if (value) {
          this.tabTitleNotificationsService.blinkTitle(`New Q&A on session page!`);
        }
      }),
    );
  }
}
