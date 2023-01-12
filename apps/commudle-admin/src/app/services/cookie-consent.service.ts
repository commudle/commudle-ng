import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private cookieConsentKey = 'cookie-consent';
  private acceptConsentValue = 'true';

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private cookieService: CookieService
  ) {
  }

  acceptCookieConsent() {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set(this.cookieConsentKey, this.acceptConsentValue, 60, '/');
    }
  }

  isCookieConsentAccepted(): boolean {
    const consentValue = isPlatformBrowser(this.platformId) ? this.cookieService.get(this.cookieConsentKey) : 'false';
    return consentValue === this.acceptConsentValue;
  }
}
