import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';


@Injectable({
  providedIn: 'root'
})
export class CommunityChannelNotificationsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    LOAD_NOTIFICATIONS: 'load_notifications',
    NEW_MESSAGE: 'new_message'
  };

  actionCable = actionCable;
  private cableSubscription;
  private subscription;
  private subscriberCount = 0;

  // all the communications received will be observables
  private notifications: BehaviorSubject<ICommunityChannel[]> = new BehaviorSubject([]);
  public notifications$ = this.notifications.asObservable();


  private hasNotifications: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public hasNotifications$ = this.notifications.asObservable();


  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {
    this.cableSubscription = this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.subscribe(connection)
        }
      }
    );
  }


  subscribe(connection) {
    //  here, multiple components might get subscribed to the same subscription to receive the same data,
    // hence this subscription was called in the constructor itself
      this.subscription = connection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_COMMUNITY_CHANNEL_DISCUSSION_NOTIFICATIONS,
      }, {
        received: (data) => {
          this.setNotifications(data);
        }
      });
    }


  setNotifications(data) {
    console.log(data);
    switch (data.action) {
      case this.ACTIONS.LOAD_NOTIFICATIONS: {
        this.notifications.next(data.community_channels);
        break;
      }
      case this.ACTIONS.NEW_MESSAGE: {
        let currentValue = this.notifications.value;
        const existingChannelIndex = currentValue.findIndex(ch => ch.id === data.community_channel.id);

        if (existingChannelIndex === -1) {
          currentValue.push(data.community_channel);
          this.notifications.next(currentValue);
        }
        break;
      }
    }
  }


  markRead(communityChannelId) {
    let currentValue = this.notifications.value;
    const existingChannelIndex = currentValue.findIndex(ch => ch.id == communityChannelId);
    if (existingChannelIndex !== -1) {
      currentValue.splice(existingChannelIndex, 1);
      this.notifications.next(currentValue);
    }
  }


  // unsubscribe only when the subscriber count is zero (that is, no component is listening to the subscriber)
  unsubscribe() {
    this.subscriberCount = Math.max(this.subscriberCount - 1, 0);
    if (this.subscription && this.subscriberCount === 0) {
      this.subscription.unsubscribe();
      this.cableSubscription.unsubscribe();
    }
  }

}
