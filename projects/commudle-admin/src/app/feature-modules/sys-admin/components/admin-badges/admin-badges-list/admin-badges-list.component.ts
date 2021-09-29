import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SysAdminBadgesService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-badges.service';
import { IBadge } from 'projects/shared-models/badge.model';
import { NbDialogService } from '@nebular/theme';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-badges-list',
  templateUrl: './admin-badges-list.component.html',
  styleUrls: ['./admin-badges-list.component.scss']
})
export class AdminBadgesListComponent implements OnInit, OnDestroy {

  currentBadgeId;
  badges: IBadge[] = [];
  page = 1;
  count = 5;
  total = -1;

  subscriptions: Subscription[] = [];

  @ViewChild('confirmDeleteBadge') confirmDeleteBadgeDialogue: TemplateRef<any>;

  constructor(
    private sysAdminBadgesService: SysAdminBadgesService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService,
  ) { }

  ngOnInit(): void {
    this.getBadges();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getBadges(): void {
    if (this.badges.length !== this.total) {
      this.subscriptions.push(
        this.sysAdminBadgesService.getAllBadges(this.page, this.count).subscribe((value) => {
          this.badges = this.badges.concat(value.badges);
          this.page = +value.page;
          this.total = +value.total;
          this.page += 1;
        })
      )
    }
  }

  confirmDeleteBadgeOpen(badgeId: number): void {
    this.currentBadgeId = badgeId;
    this.dialogService.open(this.confirmDeleteBadgeDialogue);
  }

  deleteBadge(): void {
    if (this.currentBadgeId) {
      this.subscriptions.push(
        this.sysAdminBadgesService.deleteBadge(this.currentBadgeId).subscribe((data) => {
          if (data) {
            this.toastLogService.successDialog('Successfully deleted badge!');
            this.badges = [];
            this.page = 1;
            this.total = -1;
            this.getBadges();
          }
        })
      )
    }
  }

}
