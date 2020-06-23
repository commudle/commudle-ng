import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';


@Injectable({
  providedIn: 'root'
})
export class PollsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    CREATE: 'create',
    START: 'start',
    START_SELF: 'start_self',
    STOP: 'stop',
    DELETE: 'delete',
    FILL: 'fill',
    ERROR: 'error'
  };

  actionCable = actionCable;

  private subscription;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe(pollableType, pollableId) {
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {
          this.subscription = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.POLL_CHANNEL,
            pollable_type: pollableType,
            pollable_id: pollableId
          }, {
            received: (data) => {
              console.log(data);
              this.channelData.next(data);
            }
          });
        }
      }
    );
  }


  sendData(action, data) {
    this.subscription.send({
      perform: action,
      data
    });
  }



  unsubscribe() {
    this.subscription.unsubscribe();
  }

}
