import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class WhatsNewService {
  constructor(private cookieService: CookieService) {}

  getCookieByName(cookieName) {
    return this.cookieService.get(cookieName);
  }

  // getCookieByName(cookieName) {
  //   return this.cookieService.get(cookieName);
  // }

  // setCookieCreationTime(cookieName) {
  //   this.cookieService.set(cookieName, moment().format('Do-MMM-YYYY HH:mm:ss'));
  // }

  setCookieCreationTime(cookieName) {
    const creationTime = moment().format('Do-MMM-YYYY');
    this.cookieService.set(cookieName, creationTime);
    return creationTime;
  }
}
