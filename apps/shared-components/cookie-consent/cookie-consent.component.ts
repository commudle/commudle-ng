import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from 'apps/commudle-admin/src/app/services/cookie-consent.service';
import { IsBrowserService } from 'apps/shared-services/is-browser.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { FormBuilder } from '@angular/forms';

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

  preferencesForm;
  isDisable: boolean = true;

  constructor(
    private cookieConsentService: CookieConsentService,
    private isBrowserService: IsBrowserService,
    private seoService: SeoService,
    private fb: FormBuilder,
  ) {
    this.isBrowser = this.isBrowserService.isBrowser();
    this.preferencesForm = this.fb.group({
      necessary: [true],
      analytics: [true],
      marketing: [true],
    });
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

  // acceptManagedCookies() {
  //   const options = {
  //     necessary: 'true',
  //     analytics: this.allowAnalytics ? 'true' : 'false',
  //     marketing: this.allowMarketing ? 'true' : 'false',
  //   };
  //   const cookieValue = JSON.stringify(options);
  //   this.cookieConsentService.acceptedCookieConsent(cookieValue);
  //   this.cookieConstent = false;
  // }

  // acceptManagedCookies(type) {
  //     const options = {
  //       necessary: 'true',
  //       analytics: this.preferencesForm.value.analytics ? 'true' : 'false',
  //       marketing: this.preferencesForm.value.marketing ? 'true' : 'false',
  //     };
  //   // const cookieValue = JSON.stringify(options);
  //   this.cookieConsentService.acceptedCookieConsent(options);
  //   this.cookieConstent = false;
  // }

  // acceptManagedCookies() {
  //   const options = {
  //     necessary: 'true',
  //     analytics: this.preferencesForm.value.analytics ? 'true' : 'false',
  //     marketing: this.preferencesForm.value.marketing ? 'true' : 'false',
  //     acceptAll: this.preferencesForm.value.marketing && this.preferencesForm.value.analytics ? 'true' : 'false',
  //   };
  //   // const cookieValue = JSON.stringify(options);
  //   this.cookieConsentService.acceptedCookieConsent(options);
  //   this.cookieConstent = false;
  // }

  acceptManagedCookies() {
    const analytics = this.preferencesForm.value.analytics ? 'true' : 'false';
    const marketing = this.preferencesForm.value.marketing ? 'true' : 'false';
    const acceptAll = this.preferencesForm.value.marketing && this.preferencesForm.value.analytics ? 'true' : 'false';

    this.cookieConsentService.acceptedCookieConsent(analytics, marketing, acceptAll);
    this.cookieConstent = false;
  }

  // acceptCookieConsent() {
  //   this.cookieConsentService.acceptCookieConsent();
  //   this.cookieConstent = false;
  // }

  Consent() {
    this.showPreferncesButton = true;
  }

  // analytics() {
  //   this.allowAnalytics = !this.allowAnalytics;
  // }

  // marketing() {
  //   this.allowMarketing = !this.allowMarketing;
  // }

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
