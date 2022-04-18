import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { UpdateProfileService } from 'projects/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import { SeoService } from 'projects/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit, OnDestroy {
  dialogRef: NbDialogRef<any>;
  subscriptions: Subscription[] = [];

  @ViewChild('editProfile', { static: true }) editProfile: TemplateRef<any>;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    private updateProfileService: UpdateProfileService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.openDialog();
    this.seoService.noIndex(true);
    this.updateProfile();
  }

  ngOnDestroy(): void {
    this.dialogRef.close();
    this.seoService.noIndex(false);
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openDialog() {
    this.dialogRef = this.dialogService.open(this.editProfile, { hasScroll: true });

    this.dialogRef.onClose.subscribe(() => {
      this.router.navigate([{ outlets: { p: null } }], { relativeTo: this.activatedRoute.parent });
    });
  }

  updateProfile() {
    this.subscriptions.push(
      this.updateProfileService.updateProfile$.subscribe((value) => {
        if (value) {
          this.dialogRef.close();
          this.updateProfileService.setUpdateProfileStatus(false);
        }
      }),
    );
  }
}
