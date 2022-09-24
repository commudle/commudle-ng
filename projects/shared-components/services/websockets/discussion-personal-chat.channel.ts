import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

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

  private subscriptions = {};
  private discussionBlockedStatuses = {};
  public discussionBlockedStatuses$ = {};
  // all the communications received will be observables
  private channelList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelList$ = this.channelList.asObservable();
  private channelData = {};
  public channelData$ = {};

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
      this.discussionBlockedStatuses[discussionId] = new BehaviorSubject(null);
      this.discussionBlockedStatuses$[discussionId] = this.discussionBlockedStatuses[discussionId].asObservable();

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

  setDiscussionBlockedStatuses(discussionId: number, value: boolean) {
    this.discussionBlockedStatuses[discussionId].next(value);
  }

  sendData(discussionId, action, data) {
    console.log(this.subscriptions[discussionId], 'www');

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
