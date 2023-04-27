import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbDialogRef } from '@commudle/theme';

@Component({
  selector: 'commudle-login-consent-popup',
  templateUrl: './login-consent-popup.component.html',
  styleUrls: ['./login-consent-popup.component.scss'],
})
export class LoginConsentPopupComponent implements OnInit {
  dialogRef: NbDialogRef<any>;
  constructor() {}

  ngOnInit(): void {}
}
