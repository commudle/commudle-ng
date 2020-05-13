import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { LibAuthwatchService } from './lib-authwatch.service';
import * as actionCable from 'actioncable';


@Injectable({
  providedIn: 'root'
})
export class ActionCableConnectionSocket {

  private baseAcUrl;
  actionCable = actionCable;
  private acSocket: BehaviorSubject<actionCable.Cable> = new BehaviorSubject(null);
  public acSocket$: Observable<actionCable.Cable> = this.acSocket.asObservable();


  constructor(
    private authWatchService: LibAuthwatchService
  ) { }

  setBaseUrl(envBase: string): string {
    return this.baseAcUrl = envBase;
  }

  getBaseUrl(): string {
    return this.baseAcUrl;
  }

  getRoute(channelRoute: string): string {
    return `${this.baseAcUrl}/${channelRoute}`;
  }

  connectToServer() {
    if (this.acSocket.value != null) {
      this.acSocket.value.disconnect();
      this.acSocket.next(null);
    }
    this.acSocket.next(this.actionCable.createConsumer(this.baseAcUrl + `?user_auth_token=${this.authWatchService.getAuthCookie()}`));
  }

}
