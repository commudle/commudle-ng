import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import * as actionCable from 'actioncable';
import {APPLICATION_CABLE_CHANNELS} from 'projects/shared-services/application-cable-channels.constants';
import {ActionCableConnectionSocket} from 'projects/shared-services/action-cable-connection.socket';
import {IDiscussionFollower} from 'projects/shared-models/discussion-follower.model';
import {LibAuthwatchService} from '../lib-authwatch.service';


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

  public channelData$ = {};
  private subscriptions = {};
  // all the communications received will be observables
  private channelList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelList$ = this.channelList.asObservable();
  private channelData = {};

  private newMessagesCounter: BehaviorSubject<IDiscussionFollower[]> = new BehaviorSubject([]);
  public newMessagesCounter$ = this.newMessagesCounter.asObservable();

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

  subscribe(userId, discussionId, uuid) {
    const connectionName = `${userId}_${discussionId}_${uuid}`;
    this.unsubscribe(userId, discussionId, uuid);
    if (this.cableConnection) {
      this.channelData[connectionName] = new BehaviorSubject(null);
      this.channelData$[connectionName] = this.channelData[connectionName].asObservable();
      this.channelList.next(this.channelList.getValue().add(connectionName));

      this.subscriptions[connectionName] = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_PERSONAL_DISCUSSION_CHAT_NOTIFICATIONS,
        user_id: userId,
        discussion_id: discussionId,
        app_token: this.authWatchService.getAppToken()
      }, {
        received: (data) => {
          this.channelData[connectionName].next(data);
          this.setNotifications(data);
        }
      });
    }
    return this.subscriptions[connectionName];
  }


  sendData(userId, discussionId, uuid, action, data) {
    this.subscriptions[`${userId}_${discussionId}_${uuid}`].send({
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
        const currentValue = this.newMessagesCounter.getValue();
        currentValue.unshift(data.discussion_follower);
        this.newMessagesCounter.next(currentValue);
        break;
      }
    }
  }


  resetMessageCounter() {
    this.newMessagesCounter.next([]);
  }


  unsubscribe(userId, discussionId, uuid) {
    if (this.subscriptions[`${userId}_${discussionId}_${uuid}`]) {
      this.subscriptions[`${userId}_${discussionId}_${uuid}`].unsubscribe();
      this.channelData[`${userId}_${discussionId}_${uuid}`].next(null);
    }
  }

}
