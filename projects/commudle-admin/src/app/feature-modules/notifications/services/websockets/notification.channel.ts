import { Injectable } from '@angular/core';
import * as actionCable from 'actioncable';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationChannel {
  ACTIONS = {
    NEW_NOTIFICATION: 'new_notification',
    STATUS_UPDATE: 'status_update',
  };

  actionCable = actionCable;
  private cableConnection;
  private subscription;

  private notificationData: BehaviorSubject<any> = new BehaviorSubject(null);
  public notificationData$: Observable<any> = this.notificationData.asObservable();

  constructor(private actionCableConnection: ActionCableConnectionSocket) {
    this.actionCableConnection.acSocket$.subscribe((connection) => {
      this.cableConnection = connection;
      this.subscribe();
    });
  }

  subscribe() {
    this.subscription = this.cableConnection?.subscriptions.create(
      {
        channel: APPLICATION_CABLE_CHANNELS.NOTIFICATION_CHANNEL,
      },
      {
        received: (data) => {
          this.notificationData.next(data);
          console.log(data.notification, 'channel');
        },
      },
    );
  }
}
