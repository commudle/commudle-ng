import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import { ButtonStyle, ButtonText, ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';

@Component({
  selector: 'commudle-account-management',
  templateUrl: './account-management.component.html',
  styleUrls: ['./account-management.component.scss'],
})
export class AccountManagementComponent implements OnInit {
  deactivateAccount = false;
  closeAccount = false;
  faExclamationTriangle = faExclamationTriangle;

  constructor(
    private nbDialogService: NbDialogService,
    private router: Router,
    private appUsersService: AppUsersService,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {}

  deactivateProfile(deleteProfile?: boolean) {
    this.appUsersService.deactivateProfile(deleteProfile).subscribe((data) => {});
  }

  accountManagement(data) {
    if (data === 'deactivate') {
      this.deactivateAccount = true;
      this.closeAccount = false;
    } else {
      this.deactivateAccount = false;
      this.closeAccount = true;
    }
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.DeactivateDeleteAccount,
        deactivateAccount: this.deactivateAccount,
        closeAccount: this.closeAccount,
        buttonText: ButtonText.Deactivate,
        buttonStyle: ButtonStyle.Deactivate,
      },
    });

    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted' && this.closeAccount === true) {
        this.deactivateProfile(true);
        this.gtm.dataLayerPushEvent('user-account-delete', {});
        this.router.navigate(['./']).then(() => {
          window.location.reload();
        });
      } else if (result === 'accepted' && this.closeAccount === false) {
        this.deactivateProfile();
        this.gtm.dataLayerPushEvent('user-account-deactivate', {});
        this.router.navigate(['./']).then(() => {
          window.location.reload();
        });
      }
    });
  }
}
