import { Injectable } from '@angular/core';
import {
  ActionCableConnectionSocket,
  APPLICATION_CABLE_CHANNELS,
  LibAuthwatchService,
} from '@commudle/shared-services';
import * as actionCable from 'actioncable';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DiscussionQnAChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    ADD: 'add',
    REPLY: 'reply',
    VOTE: 'vote',
    FLAG: 'flag',
    DELETE: 'delete',
    ERROR: 'error',
  };

  actionCable = actionCable;
  private cableConnection;

  private subscription;
  private actionCableSubscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private authWatchService: LibAuthwatchService,
  ) {
    this.actionCableSubscription = this.actionCableConnection.acSocket$.subscribe((connection) => {
      this.cableConnection = connection;
    });
  }

  subscribe(discussionId) {
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create(
        {
          channel: APPLICATION_CABLE_CHANNELS.DISCUSSION_QNA,
          room: discussionId,
          app_token: this.authWatchService.getAppToken(),
        },
        {
          received: (data) => {
            this.channelData.next(data);
          },
        },
      );
    }

    return this.subscription;
  }

  sendData(action, data) {
    this.subscription.send({
      perform: action,
      data,
    });
  }

  unsubscribe() {
    if (this.subscription) {
      this.channelData.next(null);
      this.subscription.unsubscribe();
      this.actionCableSubscription.unsubscribe();
    }
  }
}
