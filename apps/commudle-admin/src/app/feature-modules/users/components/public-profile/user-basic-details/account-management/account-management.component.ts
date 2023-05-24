import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
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
        consentType: 'deactivate-delete',
        deactivateAccount: this.deactivateAccount,
        closeAccount: this.closeAccount,
        buttonText: 'Accept and Logout',
      },
    });

    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted' && this.closeAccount === true) {
        const queryParams = { delete_profile: true };
        this.deactivateProfile(true);
        this.router.navigate(['/login'], { queryParams });
      } else if (result === 'accepted' && this.closeAccount === false) {
        const queryParams = { delete_profile: false };
        this.deactivateProfile();
        this.router.navigate(['/login'], { queryParams });
      }
    });
  }
}
