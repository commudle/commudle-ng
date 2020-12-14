import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { UserVisitsChannel } from 'projects/shared-services/websockets/user-visits.channel';
import { LibAuthwatchService } from './lib-authwatch.service';

@Injectable({
  providedIn: 'root'
})
export class UserVisitsService {
  private subscription;

  // visitors data
  private visitors: BehaviorSubject<any> = new BehaviorSubject(null);
  public visitors$ = this.visitors.asObservable();

  constructor(
    private userVisitsChannel: UserVisitsChannel,
    private authWatchService: LibAuthwatchService
  ) {

  }


  subscribe(url) {
    const appToken = this.authWatchService.getAppToken();
    if (appToken) {
      if (this.subscription) {
        this.userVisitsChannel.unsubscribe();
      }
      this.subscription = this.userVisitsChannel.subscribe(
        url
      );
    }

  }


  receiveData() {

    this.userVisitsChannel.channelData$.subscribe(
      data => {
        if (data) {
          switch (data.action) {
            case (this.userVisitsChannel.ACTIONS.VISITORS): {
              this.visitors.next(data.visitors);
            }
          }
        }
      }
    );

  }



}
