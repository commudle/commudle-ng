import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {ActionCableConnectionSocket} from 'apps/shared-services/action-cable-connection.socket';
import {LibAuthwatchService} from 'apps/shared-services/lib-authwatch.service';
import {APPLICATION_CABLE_CHANNELS} from 'apps/shared-services/application-cable-channels.constants';

@Injectable({
  providedIn: 'root'
})
export class UserChatMessagesChannel {

  actionCableSubscription;
  public channelData$ = {};
  private cableConnection;
  // Channel Data
  private channelData = {};
  // Subscriptions
  private subscriptions = {};
  // all the communications received will be observables
  private channelList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelList$ = this.channelList.asObservable();

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
    this.unsubscribe(discussionId);
    const connectionName = discussionId;
    if (this.cableConnection) {
      this.channelData[connectionName] = new BehaviorSubject(null);
      this.channelData$[connectionName] = this.channelData[connectionName].asObservable();
      this.channelList.next(this.channelList.getValue().add(connectionName));

      this.subscriptions[connectionName] = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_PERSONAL_DISCUSSION_CHAT_NOTIFICATIONS,
        discussion_id: discussionId,
        app_token: this.authWatchService.getAppToken()
      }, {
        received: data => {
          this.channelData[connectionName].next(data);
        }
      });
    }
    return this.subscriptions[connectionName];
  }

  sendData(discussionId, action, data) {
    this.subscriptions[discussionId].send({
      perform: action,
      data
    });
  }

  unsubscribe(discussionId) {
    if (this.subscriptions[discussionId]) {
      this.subscriptions[discussionId].unsubscribe();
      this.channelData[discussionId].next(null);
    }
  }
}
