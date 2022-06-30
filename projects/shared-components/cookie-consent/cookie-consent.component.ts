import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieConsentService } from 'projects/commudle-admin/src/app/services/cookie-consent.service';
import { CookieService } from 'ngx-cookie-service';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  cookieConstent = true;
  isBrowser = this.isBrowserService.isBrowser();
  constructor(
    private cookieConsentService: CookieConsentService,
    private cookieService: CookieService,
    private isBrowserService: IsBrowserService,
  ) {}

  ngOnInit() {
    if (this.isBrowser && !this.cookieConsentService.isCookieConsentAccepted()) {
      setTimeout(() => {
        this.cookieConstent = false;
      }, 3000);
    }

    if (this.cookieConsentService.isCookieConsentAccepted()) {
      this.cookieConstent = true;
    }
  }

  acceptCookieConsent() {
    this.cookieConsentService.acceptCookieConsent();
    this.cookieConstent = true;
  }

  disagreeCookieConsent() {
    this.cookieService.deleteAll();
    window.location.href = 'about:blank';
  }
}
