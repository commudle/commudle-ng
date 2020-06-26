import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ApiRoutesService } from 'projects/shared-services/api-routes.service';
import { UserVisitsChannel } from 'projects/shared-services/websockets/user-visits.channel';
import { v4 as uuidv4 } from 'uuid';
import { CookieService } from 'ngx-cookie-service';
import { env } from 'process';
import { environment } from 'projects/commudle-admin/src/environments/environment';

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
    private apiRoutesService: ApiRoutesService,
    private userVisitsChannel: UserVisitsChannel,
    private cookieService: CookieService
  ) {

  }


  subscribe(url) {
    if (this.subscription) {
      this.userVisitsChannel.unsubscribe();
    }
    if (!this.cookieService.check(environment.session_cookie_name)) {
      this.cookieService.set(environment.session_cookie_name, uuidv4(), 30, environment.base_url);
    }
    this.subscription = this.userVisitsChannel.subscribe(
      this.cookieService.get(environment.session_cookie_name),
      url
    );
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
