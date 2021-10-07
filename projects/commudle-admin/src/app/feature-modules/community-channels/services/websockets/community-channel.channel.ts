import { Injectable } from '@angular/core';
import * as actionCable from 'actioncable';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommunityChannelChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    ADD: 'add',
    REPLY: 'reply',
    VOTE: 'vote',
    UPDATE: 'update',
    FLAG: 'flag',
    DELETE: 'delete',
    TOGGLE_BLOCK: 'toggle_block',
    ERROR: 'error',
    CHANGE_PERMISSION: 'change_permission',
    READ_MESSAGE: 'read_message',
    PIN: 'pin',
    UNPIN: 'unpin',
  };

  actionCable = actionCable;
  actionCableSubscription: Subscription;
  cableConnection: actionCable.Cable;

  private subscription: actionCable.Channel;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$: Observable<any> = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private authWatchService: LibAuthwatchService,
  ) {
    this.actionCableSubscription = this.actionCableConnection.acSocket$.subscribe((connection) => {
      this.cableConnection = connection;
    });
  }

  subscribe(discussionId): ActionCable.Channel {
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create(
        {
          channel: APPLICATION_CABLE_CHANNELS.DISCUSSION_COMMUNITY_CHAT_CHANNEL_CHANNEL,
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

  sendData(action, data): void {
    this.subscription.send({
      perform: action,
      data,
    });
  }

  unsubscribe(): void {
    if (this.subscription) {
      this.channelData.next(null);
      this.subscription.unsubscribe();
    }
  }
}
