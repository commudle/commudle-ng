import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';


@Injectable({
  providedIn: 'root'
})
export class UserObjectVisitChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    CURRENT_USERS: 'current_users',
    USER_ADD: 'user_add',
    USER_REMOVE: 'user_remove'
  }

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



  subscribe(objectId, objectType, uuid) {
    if (this.cableConnection) {
      this.channelData[`${objectId}_${objectType}_${uuid}`] = new BehaviorSubject(null);
      this.channelData$[`${objectId}_${objectType}_${uuid}`] = this.channelData[`${objectId}_${objectType}_${uuid}`].asObservable();
      this.channelsList.next(this.channelsList.getValue().add(`${objectId}_${objectType}_${uuid}`));

      this.subscriptions[`${objectId}_${objectType}_${uuid}`] = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_OBJECT_VISIT,
        object_type: objectType,
        object_id: objectId,
        app_token: this.authWatchService.getAppToken()

      }, {
        received: (data) => {
          this.channelData[`${objectId}_${objectType}_${uuid}`].next(data);
        }
      });
    }

    return this.subscriptions[`${objectId}_${objectType}_${uuid}`];

  }


  sendData(objectId, objectType, uuid, action, data?) {
    this.subscriptions[`${objectId}_${objectType}_${uuid}`].send({
      perform: action,
      data
    });
  }



  unsubscribe(objectId, objectType, uuid) {
    if (this.subscriptions[`${objectId}_${objectType}_${uuid}`]) {
      this.subscriptions[`${objectId}_${objectType}_${uuid}`].unsubscribe();
    }
  }

}
