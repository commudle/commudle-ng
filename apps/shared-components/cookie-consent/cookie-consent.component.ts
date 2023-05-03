import { Component, Input, OnInit } from '@angular/core';
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
  @Input() showPopup = false;
  @Input() reloadApp = false;

  cookieConstent = false;
  showPreferncesButton = false;
  isDisable: boolean = true;
  isBrowser;
  preferencesForm;

  constructor(
    private cookieConsentService: CookieConsentService,
    private isBrowserService: IsBrowserService,
    private seoService: SeoService,
    private fb: FormBuilder,
  ) {
    this.isBrowser = this.isBrowserService.isBrowser();
    this.preferencesForm = this.fb.group({
      necessary: [{ value: true, disabled: true }],
      analytics: [true],
      marketing: [true],
    });
  }

  ngOnInit() {
    if (
      !(
        this.cookieConsentService.getCookieByName('com_cookiepref_analytics') ||
        this.cookieConsentService.getCookieByName('com_cookiepref_marketing')
      ) &&
      !this.seoService.isBot
    ) {
      this.cookieConstent = true;
    }
    if (this.isBrowser && !this.cookieConsentService.isCookieConsentAccepted()) {
      // setTimeout(() => {
      if (this.seoService.isBot) {
        this.cookieConstent = false;
      } else {
        this.cookieConstent = true;
      }
      // }, 3000);
    }
    this.patchCookiesValues();
  }

  acceptManagedCookies(acceptAll?) {
    if (acceptAll) {
      this.preferencesForm.patchValue({
        analytics: true,
        marketing: true,
      });
    }
    this.cookieConsentService.acceptedCookieConsent(
      this.preferencesForm.value.analytics,
      this.preferencesForm.value.marketing,
    );
    this.cookieConstent = false;
    this.showPopup = false;
    if (this.reloadApp) {
      window.location.reload();
    }
  }

  // disagreeCookieConsent() {
  //   this.cookieService.deleteAll();
  //   window.location.href = 'about:blank';
  // }

  patchCookiesValues() {
    if (this.reloadApp) {
      const cookiePref_analytics =
        this.cookieConsentService.getCookieByName('com_cookiepref_analytics') === 'granted' ? true : false;

      const cookiePref_marketing =
        this.cookieConsentService.getCookieByName('com_cookiepref_marketing') === 'granted' ? true : false;

      this.preferencesForm.patchValue({
        analytics: cookiePref_analytics,
        marketing: cookiePref_marketing,
      });
    }
  }

  Consent() {
    this.showPreferncesButton = true;
  }
}
