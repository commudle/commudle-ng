import { Injectable } from '@angular/core';
import { IDiscussionFollower } from '@commudle/shared-models';
import {
  ActionCableConnectionSocket,
  APPLICATION_CABLE_CHANNELS,
  LibAuthwatchService,
} from '@commudle/shared-services';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserChatNotificationsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    LOAD_NOTIFICATIONS: 'load_notifications',
    NEW_MESSAGE: 'new_message',
  };

  actionCableSubscription;
  private cableConnection;

  private subscription;

  private newMessagesCounter: BehaviorSubject<IDiscussionFollower[]> = new BehaviorSubject([]);
  public newMessagesCounter$ = this.newMessagesCounter.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private authWatchService: LibAuthwatchService,
  ) {
    this.actionCableSubscription = this.actionCableConnection.acSocket$.subscribe((connection) => {
      this.cableConnection = connection;
    });
  }

  subscribe() {
    this.unsubscribe();
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create(
        {
          channel: APPLICATION_CABLE_CHANNELS.USER_PERSONAL_DISCUSSION_CHAT_NOTIFICATIONS,
          app_token: this.authWatchService.getAppToken(),
        },
        {
          received: (data) => {
            this.setNotifications(data);
          },
        },
      );
    }
    return this.subscription;
  }

  setNotifications(data) {
    switch (data.action) {
      case this.ACTIONS.LOAD_NOTIFICATIONS: {
        this.newMessagesCounter.next(data.discussion_followers);
        break;
      }
      case this.ACTIONS.NEW_MESSAGE: {
        const currentValue = this.newMessagesCounter.getValue();
        currentValue.unshift(data.discussion_follower);
        this.newMessagesCounter.next(currentValue);
        break;
      }
    }
  }

  resetMessageCounter() {
    this.newMessagesCounter.next([]);
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
