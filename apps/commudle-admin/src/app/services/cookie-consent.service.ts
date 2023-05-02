import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { GoogleTagManagerService } from './google-tag-manager.service';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private cookieConsentKey = 'cookie-consent';
  private acceptConsentValue = 'true';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private cookieService: CookieService,
    private gtm: GoogleTagManagerService,
  ) {}

  acceptedCookieConsent(analytics, marketing) {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set('com_cookiepref_analytics', analytics ? 'granted' : 'denied', 60, '/');
      this.cookieService.set('com_cookiepref_marketing', marketing ? 'granted' : 'denied', 60, '/');
      this.cookieService.set(this.cookieConsentKey, this.acceptConsentValue, 60, '/');
      this.gtm.dataLayerPushEvent('com-cookie-consent', {});
    }
  }

  isCookieConsentAccepted(): boolean {
    const consentValue = isPlatformBrowser(this.platformId) ? this.cookieService.get(this.cookieConsentKey) : 'false';
    return consentValue === this.acceptConsentValue;
  }
}
