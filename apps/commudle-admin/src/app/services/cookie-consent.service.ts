import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class CookieConsentService {
  private cookieConsentKey = 'cookie-consent';
  private acceptConsentValue = 'true';
  private acceptedSelected = false;

  constructor(@Inject(PLATFORM_ID) private platformId: object, private cookieService: CookieService) {}

  acceptCookieConsent() {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set(this.cookieConsentKey, this.acceptConsentValue, 60, '/');
    }
  }

  acceptedCookieConsent(cookieValue) {
    if (isPlatformBrowser(this.platformId)) {
      this.cookieService.set(this.cookieConsentKey, cookieValue, 60, '/');
      sessionStorage.setItem('cookie-options', cookieValue);
      this.acceptedSelected = true;
    }
  }

  isCookieConsentAccepted(): boolean {
    const consentValue = isPlatformBrowser(this.platformId) ? this.cookieService.get(this.cookieConsentKey) : 'false';
    return consentValue === this.acceptConsentValue;
  }
}

// if (this.acceptedSelected) {
//   return true;
// } else {
//   const consentValue = isPlatformBrowser(this.platformId) ? this.cookieService.get(this.cookieConsentKey) : 'false';
//   // const consentValue = this.cookieService.get(this.cookieConsentKey);
//   return consentValue === this.acceptConsentValue;
// }

// return consentValue === this.acceptConsentValue ;

// getSessionCookieOptions() {
//   const options = sessionStorage.getItem('cookie-options');
//   return options ? JSON.parse(options) : null;
// }

// acceptCookieConsent(option: string) {
//   if (isPlatformBrowser(this.platformId)) {
//     this.cookieService.set(this.cookieConsentKey, option, 60, '/');
//   }
// }

// acceptCookieConsent() {
//   if (isPlatformBrowser(this.platformId)) {
//     this.cookieService.set(this.cookieConsentKey, option, 60, '/');
// const preferencesJson = JSON.stringify(preferences);
// this.cookieService.set(this.cookieConsentKey, preferencesJson, 60, '/');
// sessionStorage.setItem(this.cookieConsentKey, preferencesJson);
//   }
// }

// isCookieConsentAccepted(): boolean {
//   const consentValue = isPlatformBrowser(this.platformId) ? this.cookieService.get(this.cookieConsentKey) : 'false';
//   return consentValue === this.acceptConsentValue;
// }

// }

// cookie-consent-necessary

// acceptCookieConsent(value: string) {
//   if (isPlatformBrowser(this.platformId)) {
//     const options = JSON.parse(value);
//     this.cookieService.set('this.cookieConsentKey', options.necessary, 60, '/');
//     this.cookieService.set('this.cookieConsentKey', options.analytics, 60, '/');
//     this.cookieService.set('this.cookieConsentKey', options.marketing, 60, '/');
//   }
// }

// isCookieConsentAccepted(option: string): boolean {
//   const consentValue = isPlatformBrowser(this.platformId)
//     ? this.cookieService.get(`cookie-consent-${option}`)
//     : 'false';
//   return consentValue === 'true';
// }

// getCookieValue(): string {
//   if (isPlatformBrowser(this.platformId)) {
//     return this.cookieService.get(this.cookieConsentKey);
//   }
//   return null;
// }
