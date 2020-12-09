import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { ActionCableConnectionSocket } from '../../../shared-services/action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';


@Injectable({
  providedIn: 'root'
})
export class DiscussionQnAChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    ADD: 'add',
    REPLY: 'reply',
    VOTE: 'vote',
    FLAG: 'flag',
    DELETE: 'delete',
    ERROR: 'error'
  };

  actionCable = actionCable;

  private subscription;
  private actionCableSubscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe(discussionId) {
    this.actionCableSubscription = this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.subscription = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.DISCUSSION_QNA,
            room: discussionId
          }, {
            received: (data) => {
              this.channelData.next(data);
            }
          });
        }
      }
    );
  }


  sendData(action, data) {
    this.subscription.send({
      perform: action,
      data
    });
  }


  unsubscribe() {
    if (this.subscription) {
      this.channelData.next = null;
      this.subscription.unsubscribe();
      this.actionCableSubscription.unsubscribe();
    }
  }


}
