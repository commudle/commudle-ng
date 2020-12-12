import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';


@Injectable({
  providedIn: 'root'
})
export class UserPersonalDiscussionChatNotificationsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    LOAD_NOTIFICATIONS: 'load_notifications',
    NEW_MESSAGE: 'new_message'
  };

  actionCable = actionCable;
  actionCableSubscription;
  private cableConnection;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  private newMessagesCounter: BehaviorSubject<IDiscussionFollower[]> = new BehaviorSubject([]);
  public newMessagesCounter$ = this.newMessagesCounter.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {
    this.actionCableSubscription = this.actionCableConnection.acSocket$.subscribe(
      connection => {
        this.cableConnection = connection;
      }
    );
  }


  subscribe() {
    this.unsubscribe();
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_PERSONAL_DISCUSSION_CHAT_NOTIFICATIONS,
      }, {
        received: (data) => {
          this.channelData.next(data);
          this.setNotifications(data);
        }
      });
    }
    return this.subscription;
  }


  sendData(action, data) {
    this.subscription.send({
      perform: action,
      data
    });
  }



  setNotifications(data) {
    switch (data.action) {
      case this.ACTIONS.LOAD_NOTIFICATIONS : {
        this.newMessagesCounter.next(data.discussion_followers);
        break;
      }
      case this.ACTIONS.NEW_MESSAGE : {
        let currentValue = this.newMessagesCounter.getValue();
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
      this.channelData.next(null);
    }
  }

}
