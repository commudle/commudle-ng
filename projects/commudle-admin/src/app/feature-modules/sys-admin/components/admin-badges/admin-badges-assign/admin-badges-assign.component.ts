import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { IUserBadge } from 'projects/shared-models/user_badge.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';
import { NbDialogService } from '@nebular/theme';
import { SysAdminUserBadgesService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-user-badges.service';

@Component({
  selector: 'app-admin-badges-assign',
  templateUrl: './admin-badges-assign.component.html',
  styleUrls: ['./admin-badges-assign.component.scss']
})
export class AdminBadgesAssignComponent implements OnInit, OnDestroy {

  user_badges: IUserBadge[] = [];
  page = 1;
  count = 5;
  total = -1;
  currentUserBadgeId;

  assignBadgeForm: FormGroup = this.fb.group(
    {
      username: ['', Validators.required],
      badge_id: ['', Validators.required]
    }
  )
  subscriptions: Subscription[] = [];

  @ViewChild('confirmUnassignBadge') confirmUnassignBadgeDialogue: TemplateRef<any>;

  constructor(
    private sysAdminUserBadgesService : SysAdminUserBadgesService,
    private fb: FormBuilder,
    private libToastLogService: LibToastLogService,
    private dialogService: NbDialogService,
  ) { }

  ngOnInit(): void {
    this.getUserBadges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getUserBadges(): void {
    if(this.user_badges.length !== this.total){
      this.subscriptions.push(
        this.sysAdminUserBadgesService.getUserBadges(this.page, this.count).subscribe((value) => {
          this.user_badges = this.user_badges.concat(value.user_badges);
          this.page = +value.page;
          this.total = +value.total;
          this.page += 1;
        })
      )
    }
  }

  assignBadge(): void {
    this.subscriptions.push(
      this.sysAdminUserBadgesService.assignBadge(this.assignBadgeForm.value).subscribe(() => {
        this.assignBadgeForm.reset()
        this.user_badges = [];
        this.page = 1;
        this.total = -1;
        this.getUserBadges();
        this.libToastLogService.successDialog('Assigned badge successfully!');
      })
    )
  }

  confirmUnassignBadgeOpen(userBadgeId: number): void {
    this.currentUserBadgeId = userBadgeId;
    this.dialogService.open(this.confirmUnassignBadgeDialogue);
  }

  unassignBadge(): void {
    if(this.currentUserBadgeId){
      this.subscriptions.push(
        this.sysAdminUserBadgesService.unassignBadge(this.currentUserBadgeId).subscribe((data) => {
          if(data){
            this.libToastLogService.successDialog('Successfully Unassigned Badge!');
            this.user_badges = [];
            this.page = 1;
            this.total = -1;
            this.getUserBadges();
          }
        })
      )
    }
  }

}
