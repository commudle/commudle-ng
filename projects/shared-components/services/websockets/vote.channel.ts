import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';


@Injectable({
  providedIn: 'root'
})
export class VoteChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    TOGGLE_VOTE: 'toggle_vote',
    ERROR: 'error'
  };

  actionCable = actionCable;

  private subscriptions = {};

  // all the communications received will be observables
  // private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  // public channelData$ = this.channelData.asObservable();

  private channelData = {};
  public channelData$ = {};

  constructor(
    private actionCableConnection: ActionCableConnectionSocket
  ) {}


  subscribe(votableType, votableId, uuid) {
    return this.actionCableConnection.acSocket$.subscribe(
      connection => {
        if (connection) {

          this.channelData[`${votableId}_${votableType}_${uuid}`] = new BehaviorSubject(null);
          this.channelData$[`${votableId}_${votableType}_${uuid}`] = this.channelData[`${votableId}_${votableType}_${uuid}`].asObservable();

          this.subscriptions[`${votableId}_${votableType}_${uuid}`] = connection.subscriptions.create({
            channel: APPLICATION_CABLE_CHANNELS.VOTE_CHANNEL,
            votable_type: votableType,
            votable_id: votableId
          }, {
            received: (data) => {
              this.channelData[`${votableId}_${votableType}_${uuid}`].next(data);
            }
          });
        }
      }
    );
  }


  sendData(votableType, votableId, uuid, action, data) {
    this.subscriptions[`${votableId}_${votableType}_${uuid}`].send({
      perform: action,
      data
    });
  }



  unsubscribe(votableType, votableId, uuid) {
    this.subscriptions[`${votableId}_${votableType}_${uuid}`].unsubscribe();
  }

}
