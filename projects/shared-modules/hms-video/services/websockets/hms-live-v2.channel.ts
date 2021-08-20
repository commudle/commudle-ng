import { Injectable } from '@angular/core';
import * as actionCable from 'actioncable';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HmsLiveV2Channel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    RECORDING_STARTED: 'recording_started',
    RECORDING_STOPPED: 'recording_stopped',
    STREAMING_STARTED: 'streaming_started',
    STREAMING_STOPPED: 'streaming_stopped',
    END_STREAM: 'end_stream',
  };

  actionCable = actionCable;
  public channelData$ = {};
  public channelConnectionStatus$ = {};
  private cableConnection: actionCable.Cable;
  private subscriptions = {};
  // all the communications received will be observables
  private channelsList: BehaviorSubject<any> = new BehaviorSubject(new Set());
  public channelsList$: Observable<any> = this.channelsList.asObservable();
  private channelData = {};
  // connection statuses of each channel
  private channelConnectionStatus = {};

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private authWatchService: LibAuthwatchService,
  ) {
    this.actionCableConnection.acSocket$.subscribe((connection: ActionCable.Cable) => {
      this.cableConnection = connection;
    });
  }

  subscribe(hmsRoomId, hmsClientUid, hmsClientToken, name, role) {
    if (this.cableConnection) {
      this.channelData[`${hmsClientUid}`] = new BehaviorSubject(null);
      this.channelData$[`${hmsClientUid}`] = this.channelData[`${hmsClientUid}`].asObservable();
      this.channelsList.next(this.channelsList.getValue().add(`${hmsClientUid}`));

      this.channelConnectionStatus[`${hmsClientUid}`] = new BehaviorSubject(null);
      this.channelConnectionStatus$[`${hmsClientUid}`] = this.channelConnectionStatus[`${hmsClientUid}`].asObservable();
      this.channelConnectionStatus[`${hmsClientUid}`].next(false);

      this.subscriptions[`${hmsClientUid}`] = this.cableConnection.subscriptions.create(
        {
          channel: APPLICATION_CABLE_CHANNELS.HMS_LIVE_V2_CHANNEL,
          hms_room_id: hmsRoomId,
          hms_client_uid: hmsClientUid,
          hms_client_token: hmsClientToken,
          name,
          role,
          app_token: this.authWatchService.getAppToken(),
        },
        {
          connected: () => {
            this.channelConnectionStatus[`${hmsClientUid}`].next(true);
          },
          received: (data) => {
            this.channelData[`${hmsClientUid}`].next(data);
          },
          disconnected: () => {
            this.channelConnectionStatus[`${hmsClientUid}`].next(false);
          },
        },
      );
    }

    return this.subscriptions[`${hmsClientUid}`];
  }

  sendData(action, hmsClientUid, data): void {
    this.subscriptions[`${hmsClientUid}`].send({
      perform: action,
      data,
    });
  }

  unsubscribe(hmsClientUid): void {
    if (this.subscriptions[`${hmsClientUid}`]) {
      this.subscriptions[`${hmsClientUid}`].unsubscribe();
    }
  }
}
