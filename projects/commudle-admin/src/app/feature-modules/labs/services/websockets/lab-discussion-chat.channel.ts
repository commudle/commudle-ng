import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';


@Injectable({
  providedIn: 'root'
})
export class LabDiscussionChatChannel {
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
  private cableConnection;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  private actionCableSubscription;

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private authWatchService: LibAuthwatchService
  ) {
    this.actionCableSubscription = this.actionCableConnection.acSocket$.subscribe(
      connection => {
        this.cableConnection = connection;
      }
    );
  }


  subscribe(discussionId) {
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.DISCUSSION_CHAT_CHANNEL,
        room: discussionId,
        app_token: this.authWatchService.getAppToken()
      }, {
        received: (data) => {
          this.channelData.next(data);
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



  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.actionCableSubscription.unsubscribe();
      this.channelData.next(null);
    }
  }

}
