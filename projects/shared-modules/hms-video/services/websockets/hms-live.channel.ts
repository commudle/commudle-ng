import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';


@Injectable({
  providedIn: 'root'
})
export class HmsLiveChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    UPDATE_STATUS: 'update_status',
    EXISTING_USER: 'existing_user',
    UPDATE_CAMERA: 'update_camera',
    UPDATE_MIC: 'update_mic',
    UPDATE_USER: 'update_user',
    INVITE_TO_STAGE: 'invite_to_stage',
    MUTE_PEER: 'mute_peer',
    REMOVE_FROM_STAGE: 'remove_from_stage',
    END_STREAM: 'end_stream'
}

  actionCable = actionCable;
  private cableConnection;

  private subscriptions = {};

  // all the communications received will be observables
  private channelsList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelsList$ = this.channelsList.asObservable();

  private channelData = {};
  public channelData$ = {};

    // connection statuses of each channel
    private channelConnectionStatus = {};
    public channelConnectionStatus$ = {};

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



  subscribe(hmsRoomId, hmsClientUid, hmsClientToken, name, role) {
    if (this.cableConnection) {
      this.channelData[`${hmsClientUid}`] = new BehaviorSubject(null);
      this.channelData$[`${hmsClientUid}`] = this.channelData[`${hmsClientUid}`].asObservable();
      this.channelsList.next(this.channelsList.getValue().add(`${hmsClientUid}`));

      this.channelConnectionStatus[`${hmsClientUid}`] = new BehaviorSubject(null);
      this.channelConnectionStatus$[`${hmsClientUid}`] = this.channelConnectionStatus[`${hmsClientUid}`].asObservable();
      this.channelConnectionStatus[`${hmsClientUid}`].next(false);


      this.subscriptions[`${hmsClientUid}`] = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.HMS_LIVE_CHANNEL,
        hms_room_id: hmsRoomId,
        hms_client_uid: hmsClientUid,
        hms_client_token: hmsClientToken,
        name,
        role,
        app_token: this.authWatchService.getAppToken()

      }, {
        connected: () => {
          this.channelConnectionStatus[`${hmsClientUid}`].next(true);
        },
        received: (data) => {
          this.channelData[`${hmsClientUid}`].next(data);
        },
        disconnected: () => {
          this.channelConnectionStatus[`${hmsClientUid}`].next(false);
        }
      });
    }

    return this.subscriptions[`${hmsClientUid}`];

  }


  sendData(action, hmsClientUid, data) {
    this.subscriptions[`${hmsClientUid}`].send({
      perform: action,
      data
    });
  }



  unsubscribe(hmsClientUid) {
    if (this.subscriptions[`${hmsClientUid}`]) {
      this.subscriptions[`${hmsClientUid}`].unsubscribe();
    }
  }

}
