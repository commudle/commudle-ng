import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private cookieConsentKey = 'cookie-consent';
  private acceptConsentValue = 'true';

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
  ) { }

  acceptCookieConsent() {
    isPlatformBrowser(this.platformId) ? localStorage.setItem(this.cookieConsentKey, this.acceptConsentValue) : false;
  }

  isCookieConsentAccepted(): boolean {
    const consentValue = (isPlatformBrowser(this.platformId) ? localStorage.getItem(this.cookieConsentKey) : false);
    return consentValue === this.acceptConsentValue;
  }
}
