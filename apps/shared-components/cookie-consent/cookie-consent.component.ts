import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from 'apps/commudle-admin/src/app/services/cookie-consent.service';
import { IsBrowserService } from 'apps/shared-services/is-browser.service';
import { SeoService } from 'apps/shared-services/seo.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  cookieConstent = false;
  isBrowser;
  showPreferncesButton = false;
  allowNecessary = true;
  allowAnalytics = true;
  allowMarketing = true;

  constructor(
    private cookieConsentService: CookieConsentService,
    private isBrowserService: IsBrowserService,
    private seoService: SeoService,
  ) {
    this.isBrowser = this.isBrowserService.isBrowser();
  }

  ngOnInit() {
    if (this.isBrowser && !this.cookieConsentService.isCookieConsentAccepted()) {
      setTimeout(() => {
        if (this.seoService.isBot) {
          this.cookieConstent = false;
        } else {
          this.cookieConstent = true;
        }
      }, 3000);
    }
  }

  acceptManagedCookies() {
    const options = {
      necessary: 'true',
      analytics: this.allowAnalytics ? 'true' : 'false',
      marketing: this.allowMarketing ? 'true' : 'false',
    };
    const cookieValue = JSON.stringify(options);
    this.cookieConsentService.acceptedCookieConsent(cookieValue);
    this.cookieConstent = false;
  }

  acceptCookieConsent() {
    this.cookieConsentService.acceptCookieConsent();
    this.cookieConstent = false;
  }

  Consent() {
    this.showPreferncesButton = true;
  }

  analytics() {
    this.allowAnalytics = !this.allowAnalytics;
  }

  marketing() {
    this.allowMarketing = !this.allowMarketing;
  }

  // disagreeCookieConsent() {
  //   this.cookieService.deleteAll();
  //   window.location.href = 'about:blank';
  // }
}

// Consent() {
//   const managePreferencesBtn = document.getElementById('managePreferences') as HTMLButtonElement;
//   const preferenceButtonsDiv = document.getElementById('preferenceButtons') as HTMLDivElement;
//   managePreferencesBtn.addEventListener('click', () => {
//     preferenceButtonsDiv.style.display = 'block';
//   });
// }

// acceptNecessary() {
//   sessionStorage.setItem('cookieConsentSelectedOption', 'necessary');
//   this.allowNecessary = true;
//   this.allowAnalytics = false;
//   this.allowMarketing = false;
// }

// acceptAnalytics() {
//   // this.allowAnalytics = !this.allowAnalytics;
//   // sessionStorage.setItem('allowAnalytics', this.allowAnalytics ? 'true' : 'false');
//   sessionStorage.setItem('cookieConsentSelectedOption', 'analytics');
//   this.allowNecessary = false;
//   this.allowAnalytics = true;
//   this.allowMarketing = false;
// }

// acceptMarketing() {
//   sessionStorage.setItem('cookieConsentSelectedOption', 'marketing');
//   this.allowNecessary = false;
//   this.allowAnalytics = false;
//   this.allowMarketing = true;
// }
