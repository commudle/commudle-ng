import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@commudle/theme';

@Component({
  selector: 'commudle-login-consent-popup',
  templateUrl: './login-consent-popup.component.html',
  styleUrls: ['./login-consent-popup.component.scss'],
})
export class LoginConsentPopupComponent implements OnInit {
  @Output() consentValueChanged = new EventEmitter<boolean>();
  consentValue = true;

  constructor(private dialogRef: NbDialogRef<LoginConsentPopupComponent>) {}

  ngOnInit(): void {}

  submitConsent() {
    this.consentValueChanged.emit(this.consentValue);
    this.dialogRef.close();
  }
}
