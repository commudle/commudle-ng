import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { environment } from '@commudle/shared-environments';
import * as actionCable from 'actioncable';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject } from 'rxjs';
import { ActionCableConnectionSocket } from '../action-cable-connection.socket';
import { APPLICATION_CABLE_CHANNELS } from '../application-cable-channels.constants';
import { LibAuthwatchService } from '../lib-authwatch.service';

@Injectable({
  providedIn: 'root',
})
export class UserVisitsChannel {
  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    VISITORS: 'visitors',
    PING: 'ping',
  };

  actionCable = actionCable;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);
  private cableConnection;

  private subscription;
  private pingInterval;

  // all the communications received will be observables
  private channelData: BehaviorSubject<any> = new BehaviorSubject(null);
  public channelData$ = this.channelData.asObservable();

  constructor(
    private actionCableConnection: ActionCableConnectionSocket,
    private cookieService: CookieService,
    private authWatchService: LibAuthwatchService,
    @Inject(PLATFORM_ID) private platformId: Record<string, unknown>,
  ) {
    this.actionCableConnection.acSocket$.subscribe((connection) => {
      this.cableConnection = connection;
    });
  }

  subscribe(url) {
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create(
        {
          channel: APPLICATION_CABLE_CHANNELS.USER_VISITS,
          session_token: this.cookieService.get(environment.session_cookie_name),
          url: url,
          app_token: this.authWatchService.getAppToken(),
        },
        {
          connected: () => {
            this.sendData(this.ACTIONS.VISITORS, {});
          },
          received: (data) => {
            this.channelData.next(data);
          },
        },
      );

      this.clientPings();
    }
    return this.subscription;
  }

  sendData(action, data) {
    this.subscription.send({
      perform: action,
      data,
    });
  }

  unsubscribe() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.channelData.next(null);
    }
  }

  clientPings() {
    if (this.isBrowser) {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }

      if (this.isBrowser) {
        this.pingInterval = setInterval(() => {
          this.sendData(this.ACTIONS.PING, {});
        }, 30000);
      }
    }
  }
}
