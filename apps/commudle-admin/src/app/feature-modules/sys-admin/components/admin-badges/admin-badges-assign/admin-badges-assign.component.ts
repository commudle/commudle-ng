import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { SysAdminUserBadgesService } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-user-badges.service';
import { IUserBadge } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-admin-badges-assign',
  templateUrl: './admin-badges-assign.component.html',
  styleUrls: ['./admin-badges-assign.component.scss'],
})
export class AdminBadgesAssignComponent implements OnInit, OnDestroy {
  userBadges: IUserBadge[] = [];
  page = 1;
  count = 5;
  total = -1;
  currentUserBadgeId;

  assignBadgeForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    badge_id: ['', Validators.required],
  });
  subscriptions: Subscription[] = [];

  @ViewChild('confirmUnassignBadge') confirmUnassignBadgeDialogue: TemplateRef<any>;

  constructor(
    private sysAdminUserBadgesService: SysAdminUserBadgesService,
    private fb: FormBuilder,
    private libToastLogService: LibToastLogService,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit(): void {
    this.getUserBadges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getUserBadges(): void {
    if (this.userBadges.length !== this.total) {
      this.subscriptions.push(
        this.sysAdminUserBadgesService.getUserBadges(this.page, this.count).subscribe((value) => {
          this.userBadges = this.userBadges.concat(value.user_badges);
          this.page = +value.page;
          this.total = +value.total;
          this.page += 1;
        }),
      );
    }
  }

  assignBadge(): void {
    this.subscriptions.push(
      this.sysAdminUserBadgesService.assignBadge(this.assignBadgeForm.value).subscribe(() => {
        this.libToastLogService.successDialog('Assigned badge successfully!');
        this.assignBadgeForm.reset();
        this.userBadges = [];
        this.page = 1;
        this.total = -1;
        this.getUserBadges();
      }),
    );
  }

  confirmUnassignBadgeOpen(userBadgeId: number): void {
    this.currentUserBadgeId = userBadgeId;
    this.dialogService.open(this.confirmUnassignBadgeDialogue);
  }

  unassignBadge(): void {
    if (this.currentUserBadgeId) {
      this.subscriptions.push(
        this.sysAdminUserBadgesService.unassignBadge(this.currentUserBadgeId).subscribe((data) => {
          if (data) {
            this.libToastLogService.successDialog('Successfully Unassigned Badge!');
            this.userBadges = [];
            this.page = 1;
            this.total = -1;
            this.getUserBadges();
          }
        }),
      );
    }
  }
}
