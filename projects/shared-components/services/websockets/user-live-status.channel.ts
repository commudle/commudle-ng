import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';


@Injectable({
  providedIn: 'root'
})
export class UserLiveStatusChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    IS_ONLINE: 'is_online',
    IS_OFFLINE: 'is_offline'
  };

  actionCable = actionCable;
  actionCableSubscription;
  private cableConnection;

  private subscriptions = {};

  // all the communications received will be observables
  private channelsList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelsList$ = this.channelsList.asObservable();

  private channelData = {};
  public channelData$ = {};

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


  subscribe(userId, uuid) {
    if (this.cableConnection) {
      this.channelData[`${userId}_${uuid}`] = new BehaviorSubject(null);
      this.channelData$[`${userId}_${uuid}`] = this.channelData[`${userId}_${uuid}`].asObservable();
      this.channelsList.next(this.channelsList.getValue().add(`${userId}_${uuid}`));

      this.subscriptions[`${userId}_${uuid}`] = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_LIVE_STATUS,
        user_id: userId,
        app_token: this.authWatchService.getAppToken()
      }, {
        received: (data) => {
          this.channelData[`${userId}_${uuid}`].next(data);
        }
      });
    }

    return this.channelData[`${userId}_${uuid}`];
  }



  unsubscribe(userId, uuid) {
    if (this.subscriptions[`${userId}_${uuid}`]) {
      this.subscriptions[`${userId}_${uuid}`].unsubscribe();
    }
  }

}
