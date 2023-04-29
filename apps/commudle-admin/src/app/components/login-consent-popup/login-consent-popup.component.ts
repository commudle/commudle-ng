import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@commudle/theme';
import { faUserShield } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-login-consent-popup',
  templateUrl: './login-consent-popup.component.html',
  styleUrls: ['./login-consent-popup.component.scss'],
})
export class LoginConsentPopupComponent implements OnInit {
  @Output() consentValueChangedOutput = new EventEmitter<object>();

  consent_marketing = true;
  consent_privacy_tnc = true;
  faUserShield = faUserShield;

  constructor(private dialogRef: NbDialogRef<LoginConsentPopupComponent>) {}

  ngOnInit(): void {}

  submitConsent() {
    const consent = {
      consent_privacy_tnc: this.consent_privacy_tnc,
      consent_marketing: this.consent_marketing,
    };
    this.consentValueChangedOutput.emit(consent);
    this.dialogRef.close();
  }
}
