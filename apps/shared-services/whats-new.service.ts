import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import moment from 'moment';
import { CmsService } from 'apps/shared-services/cms.service';

@Injectable({
  providedIn: 'root',
})
export class WhatsNewService {
  constructor(private cookieService: CookieService, private cmsService: CmsService) {}

  getCookieByName(cookieName) {
    return this.cookieService.get(cookieName);
  }

  // setCookieCreationTime(cookieName) {
  //   this.cookieService.set(cookieName, moment().format('Do-MMM-YYYY HH:mm:ss'));
  // }

  setCookieCreationTime(cookieName) {
    const creationTime = new Date().toISOString();
    this.cookieService.set(cookieName, creationTime);
  }

  getNewUpdates() {
    return this.cmsService.getDataByType('whatNew');
  }
}
