import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from 'projects/commudle-admin/src/app/services/cookie-consent.service';
// import { CookieService } from 'ngx-cookie-service';
import { IsBrowserService } from 'projects/shared-services/is-browser.service';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  cookieConstent = false;
  isBrowser = this.isBrowserService.isBrowser();

  constructor(
    private cookieConsentService: CookieConsentService,
    // private cookieService: CookieService,
    private isBrowserService: IsBrowserService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    if (this.isBrowser && !this.cookieConsentService.isCookieConsentAccepted()) {
      setTimeout(() => {
        if (this.seoService.isBot) {
          this.cookieConstent = false;
        }
      }, 3000);
    }
  }

  acceptCookieConsent() {
    this.cookieConsentService.acceptCookieConsent();
    this.cookieConstent = false;
  }

  // disagreeCookieConsent() {
  //   this.cookieService.deleteAll();
  //   window.location.href = 'about:blank';
  // }
}
