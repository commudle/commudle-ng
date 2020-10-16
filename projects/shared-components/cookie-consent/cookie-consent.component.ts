import { NbWindowRef } from '@nebular/theme';
import { Component, OnInit } from '@angular/core';
import { CookieConsentService } from 'projects/commudle-admin/src/app/services/cookie-consent.service';

@Component({
  selector: 'app-cookie-consent',
  templateUrl: './cookie-consent.component.html',
  styleUrls: ['./cookie-consent.component.scss']
})
export class CookieConsentComponent implements OnInit {

  constructor(private cookieConsentService: CookieConsentService, protected ref: NbWindowRef) { }

  ngOnInit() {
  }

  acceptCookieConsent() {
    this.cookieConsentService.acceptCookieConsent();
    this.ref.close();
  }

  disagreeCookieConsent() {
    window.close();
  }

}
