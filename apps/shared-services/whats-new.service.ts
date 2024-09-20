import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CmsService } from 'apps/shared-services/cms.service';

@Injectable({
  providedIn: 'root',
})
export class WhatsNewService {
  constructor(private cookieService: CookieService, private cmsService: CmsService) {}

  getCookieByName(cookieName) {
    return this.cookieService.get(cookieName);
  }

  setCookieCreationTime(cookieName) {
    const creationTime = new Date().toISOString();
    this.cookieService.set(cookieName, creationTime, 365, '/');
  }

  getNewUpdates(date) {
    return this.cmsService.getDataByTypeFilterWithDate('whatNew', date, 'date desc');
  }
}
