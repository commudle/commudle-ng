import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieConsentService {
  private cookieConsentKey = 'cookie-consent';
  private acceptConsentValue = 'true';

  constructor() { }

  acceptCookieConsent() {
    localStorage.setItem(this.cookieConsentKey, this.acceptConsentValue);
  }

  isCookieConsentAccepted(): boolean {
    const consentValue = localStorage.getItem(this.cookieConsentKey);
    return consentValue === this.acceptConsentValue;
  }
}
