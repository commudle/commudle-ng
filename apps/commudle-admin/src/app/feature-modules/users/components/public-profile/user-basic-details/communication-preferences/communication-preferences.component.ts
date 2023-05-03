import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NbDialogService, NbDialogRef } from '@commudle/theme';
import { LoginConsentPopupComponent } from 'apps/commudle-admin/src/app/components/login-consent-popup/login-consent-popup.component';

@Component({
  selector: 'commudle-communication-preferences',
  templateUrl: './communication-preferences.component.html',
  styleUrls: ['./communication-preferences.component.scss'],
})
export class CommunicationPreferencesComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  showPopup = false;

  subscriptions: Subscription[] = [];
  consent_privacy_tnc = false;
  consent_marketing = false;
  constructor(
    private userProfileManagerService: UserProfileManagerService,
    private fb: FormBuilder,
    private dialogService: NbDialogService,
  ) {
    this.loginForm = this.fb.group({
      consent_privacy_tnc: [''],
      consent_marketing: [''],
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  updateCommunicationPreferences(): void {
    this.subscriptions.push(
      this.userProfileManagerService.updateCommunicationPreferences(this.loginForm.value).subscribe(),
    );
  }

  submit() {
    const dialogRef = this.dialogService.open(LoginConsentPopupComponent, {
      hasBackdrop: true,
      closeOnBackdropClick: false,
    });
    dialogRef.componentRef.instance.consentValueChangedOutput.subscribe((consent: any) => {
      this.consent_privacy_tnc = consent.consent_privacy_tnc;
      this.consent_marketing = consent.consent_marketing;
      this.loginForm.controls['consent_privacy_tnc'].setValue(consent.consent_privacy_tnc);
      this.loginForm.controls['consent_marketing'].setValue(consent.consent_marketing);
      this.updateCommunicationPreferences();

      dialogRef.close();
    });
  }
}
