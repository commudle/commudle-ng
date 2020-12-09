import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';


@Injectable({
  providedIn: 'root'
})
export class CommunityChannelChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    ADD: 'add',
    REPLY: 'reply',
    UPDATE: 'update',
    VOTE: 'vote',
    FLAG: 'flag',
    DELETE: 'delete',
    TOGGLE_BLOCK: 'toggle_block',
    ERROR: 'error'
  };

  actionCable = actionCable;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe(discussionId) {
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.subscription = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.DISCUSSION_COMMUNITY_CHAT_CHANNEL_CHANNEL,
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
      this.channelData.next(null);
      this.subscription.unsubscribe();
    }
  }

}
