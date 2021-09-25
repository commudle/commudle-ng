import { Component, EventEmitter, Output, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { UpdateProfileService } from 'projects/commudle-admin/src/app/feature-modules/users/services/update-profile.service';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent {
  @ViewChild('editProfile', { static: true }) editProfile: TemplateRef<any>;
  dialogRef: NbDialogRef<any>;
  subscriptions: Subscription[] = [];

  constructor(
    private dialogService: NbDialogService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private updateProfileService: UpdateProfileService,
  ) {}

  ngOnInit(): void {
    this.openForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  openForm() {
    this.dialogRef = this.dialogService.open(this.editProfile, { hasScroll: true });

    this.dialogRef.onClose.subscribe(() => {
      this.router.navigate([{ outlets: { p: null } }], { relativeTo: this.activatedRoute.parent });
    });

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
