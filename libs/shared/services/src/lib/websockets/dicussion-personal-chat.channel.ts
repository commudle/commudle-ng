import { Injectable } from '@angular/core';
import * as actionCable from 'actioncable';
import { BehaviorSubject } from 'rxjs';
import { ActionCableConnectionSocket } from '../action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from '../application-cable-channels.constants';
import { LibAuthwatchService } from '../lib-authwatch.service';

@Injectable({
  providedIn: 'root',
})
export class DiscussionPersonalChatChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    ADD: 'add',
    REPLY: 'reply',
    VOTE: 'vote',
    FLAG: 'flag',
    DELETE: 'delete',
    TOGGLE_BLOCK: 'toggle_block',
    ERROR: 'error',
  };

  actionCable = actionCable;
  cableConnection;

  public channelData$ = {};
  private subscriptions = {};
  // all the communications received will be observables
  private channelList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelList$ = this.channelList.asObservable();
  private channelData = {};

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private authWatchService: LibAuthwatchService,
  ) {
    this.actionCableConnection.acSocket$.subscribe((connection) => {
      this.cableConnection = connection;
    });
  }

  subscribe(discussionId) {
    const connectionName = discussionId;
    if (this.cableConnection) {
      this.channelData[connectionName] = new BehaviorSubject(null);
      this.channelData$[connectionName] = this.channelData[connectionName].asObservable();
      this.channelList.next(this.channelList.getValue().add(connectionName));

      this.subscriptions[discussionId] = this.cableConnection.subscriptions.create(
        {
          channel: APPLICATION_CABLE_CHANNELS.DISCUSSION_PERSONAL_CHAT_CHANNEL,
          room: discussionId,
          app_token: this.authWatchService.getAppToken(),
        },
        {
          received: (data) => {
            this.channelData[connectionName].next(data);
          },
        },
      );
    }

    return this.subscriptions[connectionName];
  }

  sendData(discussionId, action, data) {
    this.subscriptions[discussionId].send({
      perform: action,
      data,
    });
  }

  unsubscribe(discussionId) {
    if (this.subscriptions[discussionId]) {
      this.channelData[discussionId].next(null);
      this.subscriptions[discussionId].unsubscribe();
    }
  }
}
