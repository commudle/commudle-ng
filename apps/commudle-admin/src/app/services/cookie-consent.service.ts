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

  // acceptCookieConsent() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.cookieService.set(this.cookieConsentKey, this.acceptConsentValue, 60, '/');
  //   }
  // }

  // acceptedCookieConsent(cookieValue) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.cookieService.set('com_cookiepref_analytics', cookieValue, 60, '/');
  //     this.cookieService.set('com_cookiepref_marketing', cookieValue, 60, '/');
  //     this.cookieService.set(this.cookieConsentKey, this.acceptConsentValue, 60, '/');
  //     // sessionStorage.setItem('cookie-options', cookieValue);
  //     this.acceptedSelected = true;
  //   }
  // }

  acceptedCookieConsent(analytics, marketing, acceptAll) {
    if (isPlatformBrowser(this.platformId)) {
      // const options = JSON.parse(cookieValue);
      this.cookieService.set('com_cookiepref_analytics', analytics, 60, '/');
      this.cookieService.set('com_cookiepref_marketing', marketing, 60, '/');
      this.cookieService.set(this.cookieConsentKey, acceptAll, 60, '/');
      this.gtm.dataLayerPushEvent('consent', {
        analytics: analytics,
        marketing: marketing,
        acceptAll: acceptAll,
      });
      console.log(window.dataLayer);
      // sessionStorage.setItem('cookie-options', cookieValue);
    }
  }

  // acceptedCookieConsent(options) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     // const options = JSON.parse(cookieValue);
  //     this.cookieService.set('com_cookiepref_analytics', options.analytics, 60, '/');
  //     this.cookieService.set('com_cookiepref_marketing', options.marketing, 60, '/');
  //     this.cookieService.set(this.cookieConsentKey, options.acceptAll, 60, '/');
  //     this.gtm.dataLayerPushEvent('consent', { cookiepref: options, acceptAll: this.acceptConsentValue });
  //     console.log(window.dataLayer);
  //     // sessionStorage.setItem('cookie-options', cookieValue);
  //     this.acceptedSelected = true;
  //   }
  // }

  // acceptedCookieConsent(cookieValue) {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.cookieService.set(this.cookieConsentKey, cookieValue, 60, '/');
  //     sessionStorage.setItem('cookie-options', cookieValue);
  //     this.acceptedSelected = true;
  //   }
  // }

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
