import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CookieConsentService } from 'projects/commudle-admin/src/app/services/cookie-consent.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss'],
})
export class CookieConsentComponent implements OnInit {
  @Output() close = new EventEmitter();

  constructor(private cookieConsentService: CookieConsentService, private cookieService: CookieService) {}

  ngOnInit() {}

  acceptCookieConsent() {
    this.cookieConsentService.acceptCookieConsent();
    this.close.emit(true);
  }

  disagreeCookieConsent() {
    this.cookieService.deleteAll();
    window.location.href = 'about:blank';
  }
}
