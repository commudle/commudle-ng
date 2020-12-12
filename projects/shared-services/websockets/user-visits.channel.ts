import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';


@Injectable({
  providedIn: 'root'
})
export class UserVisitsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    VISITORS: 'visitors'
  };

  actionCable = actionCable;
  private cableConnection;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        this.cableConnection = connection;
      }
    );
  }


  subscribe(sessionToken, url, appToken) {
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_VISITS,
        session_token: sessionToken,
        url: url,
        app_token: appToken
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
      this.channelData.next(null);
    }
  }

}
