import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as actionCable from 'actioncable';
import { APPLICATION_CABLE_CHANNELS } from 'projects/shared-services/application-cable-channels.constants';
import { ActionCableConnectionSocket } from 'projects/shared-services/action-cable-connection.socket';
import { isPlatformBrowser } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { LibAuthwatchService } from '../lib-authwatch.service';


@Injectable({
  providedIn: 'root'
})
export class UserVisitsChannel {
  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  ACTIONS = {
    SET_PERMISSIONS: 'set_permissions',
    VISITORS: 'visitors',
    PING: 'ping'
  };

  actionCable = actionCable;
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
    @Inject(PLATFORM_ID) private platformId: Object,

  ) {
    this.actionCableConnection.acSocket$.subscribe(
      connection => {
        this.cableConnection = connection;
      }
    );
  }


  subscribe(url) {
    if (this.cableConnection) {
      this.subscription = this.cableConnection.subscriptions.create({
        channel: APPLICATION_CABLE_CHANNELS.USER_VISITS,
        session_token: this.cookieService.get(environment.session_cookie_name),
        url: url,
        app_token: this.authWatchService.getAppToken()
      }, {
        connected: () => {
          this.sendData(this.ACTIONS.VISITORS, {});
        },
        received: (data) => {
          this.channelData.next(data);
        }
      });

      this.clientPings();
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

  clientPings() {
    if (this.isBrowser) {
      if (this.pingInterval) {
        clearInterval(this.pingInterval);
      }

      if (this.isBrowser) {
        this.pingInterval = setInterval(() => {
          this.sendData(this.ACTIONS.PING, {})
        }, 30000);
      }
    }

  }

}
