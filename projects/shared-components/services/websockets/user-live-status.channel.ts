import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';


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

  private subscriptions = {};

  // all the communications received will be observables
  private channelsList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelsList$ = this.channelsList.asObservable();

  private channelData = {};
  public channelData$ = {};

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe(userId, uuid) {
    return this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.channelData[`${userId}_${uuid}`] = new BehaviorSubject(null);
          this.channelData$[`${userId}_${uuid}`] = this.channelData[`${userId}_${uuid}`].asObservable();
          this.channelsList.next(this.channelsList.getValue().add(`${userId}_${uuid}`));

          this.subscriptions[`${userId}_${uuid}`] = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.USER_LIVE_STATUS,
            user_id: userId
          }, {
            received: (data) => {
              this.channelData[`${userId}_${uuid}`].next(data);
            }
          });
        }
      }
    );
  }



  unsubscribe(userId, uuid) {
    if (this.subscriptions[`${userId}_${uuid}`]) {
      this.subscriptions[`${userId}_${uuid}`].unsubscribe();
    }
  }

}
