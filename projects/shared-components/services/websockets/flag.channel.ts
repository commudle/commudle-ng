import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';


@Injectable({
  providedIn: 'root'
})
export class FlagChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    TOGGLE_FLAG: 'toggle_flag',
    ERROR: 'error'
  };

  actionCable = actionCable;
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
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        this.cableConnection = connection;
      }
    )
  }



  subscribe(flaggableType, flaggableId, uuid) {
    if (this.cableConnection) {
      this.channelData[`${flaggableId}_${flaggableType}_${uuid}`] = new BehaviorSubject(null);
      this.channelData$[`${flaggableId}_${flaggableType}_${uuid}`] = this.channelData[`${flaggableId}_${flaggableType}_${uuid}`].asObservable();
      this.channelsList.next(this.channelsList.getValue().add(`${flaggableId}_${flaggableType}_${uuid}`));

      this.subscriptions[`${flaggableId}_${flaggableType}_${uuid}`] = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.FLAG_CHANNEL,
        flaggable_type: flaggableType,
        flaggable_id: flaggableId,
        app_token: this.authWatchService.getAppToken()

      }, {
        received: (data) => {
          this.channelData[`${flaggableId}_${flaggableType}_${uuid}`].next(data);
        }
      });
    }

    return this.subscriptions[`${flaggableId}_${flaggableType}_${uuid}`];

  }


  sendData(flaggableType, flaggableId, uuid, action, data) {
    this.subscriptions[`${flaggableId}_${flaggableType}_${uuid}`].send({
      perform: action,
      data
    });
  }



  unsubscribe(flaggableType, flaggableId, uuid) {
    if (this.subscriptions[`${flaggableId}_${flaggableType}_${uuid}`]) {
      this.subscriptions[`${flaggableId}_${flaggableType}_${uuid}`].unsubscribe();
    }
  }

}
