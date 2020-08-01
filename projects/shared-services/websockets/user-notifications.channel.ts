import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { IDiscussionFollower } from 'projects/shared-models/discussion-follower.model';


@Injectable({
  providedIn: 'root'
})
export class UserNotificationsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    NEW_MESSAGE: 'new_message'
  };

  actionCable = actionCable;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  private newMessagesCounter: BehaviorSubject<IDiscussionFollower[]> = new BehaviorSubject([]);
  public newMessagesCounter$ = this.newMessagesCounter.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe() {
    this.unsubscribe();
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.subscription = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.USER_NOTIFICATIONS,
          }, {
            received: (data) => {
              console.log(data);
              this.channelData.next(data);
              this.setNotifications(data);
            }
          });
        }
      }
    );
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
      case this.ACTIONS.NEW_MESSAGE : {
        let currentValue = this.newMessagesCounter.getValue();
        currentValue.unshift(data.discussion_follower);
        this.newMessagesCounter.next(currentValue);
        console.log(currentValue);
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
