import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { UserVisitsChannel } from 'projects/shared-services/websockets/user-visits.channel';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'projects/commudle-admin/src/environments/environment';
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
    private http: HttpClient,
    private userVisitsChannel: UserVisitsChannel,
    private cookieService: CookieService,
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
        this.cookieService.get(environment.session_cookie_name),
        url,
        this.authWatchService.getAppToken()
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
