import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
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
  cookieConstent = false;
  isBrowser;
  showPreferncesButton = false;

  preferencesForm;
  isDisable: boolean = true;

  @Input() showPopup = false;

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
    this.cookieConsentService.acceptedCookieConsent(
      this.preferencesForm.value.analytics,
      this.preferencesForm.value.marketing,
    );
    this.cookieConstent = false;
  }

  // disagreeCookieConsent() {
  //   this.cookieService.deleteAll();
  //   window.location.href = 'about:blank';
  // }

  Consent() {
    this.showPreferncesButton = true;
  }
}
