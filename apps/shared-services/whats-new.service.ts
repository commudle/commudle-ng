import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { CmsService } from 'apps/shared-services/cms.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WhatsNewService {
  showWhatsNewPopup: BehaviorSubject<boolean> = new BehaviorSubject(true);
  showWhatsNewPopup$ = this.showWhatsNewPopup.asObservable();
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

  hideWhatsNewPopup() {
    this.showWhatsNewPopup.next(false);
  }
}
