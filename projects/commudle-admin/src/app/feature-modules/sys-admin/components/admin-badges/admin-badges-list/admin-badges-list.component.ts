import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { SysAdminBadgesService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-badges.service';
import { IBadge } from 'projects/shared-models/badge.model';
import { NbDialogService } from '@nebular/theme';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-admin-badges-list',
  templateUrl: './admin-badges-list.component.html',
  styleUrls: ['./admin-badges-list.component.scss']
})
export class AdminBadgesListComponent implements OnInit {

  currentBadgeId;
  badges: IBadge[] = [];
  page = 1;
  count = 15;
  total = -1;

  @ViewChild('confirmDeleteBadge') confirmDeleteBadgeDialogue: TemplateRef<any>;

  constructor(
    private sysAdminBadgesService : SysAdminBadgesService,
    private dialogService: NbDialogService,
    private toastLogService: LibToastLogService,
  ) { }

  ngOnInit(): void {
    this.getBadges();
  }

  getBadges(): void {
    console.log(this.total)
    console.log(this.badges.length)
    if (this.badges.length !== this.total) {
       this.sysAdminBadgesService.getAllBadges(this.page, this.count).subscribe((value) => {
        //console.log(value)
        this.badges = this.badges.concat(value.badges);
        this.page = +value.page;
        this.total = +value.total;
        this.page += 1;
        console.log(this.badges)
        console.log(this.total)
        console.log(this.badges.length)
      });
    }
  }

  confirmDeleteBadgeOpen(badgeId: number): void {
    this.currentBadgeId = badgeId;
    this.dialogService.open(this.confirmDeleteBadgeDialogue);
  }

  deleteBadge(): void {
    if(this.currentBadgeId){
      this.sysAdminBadgesService.deleteBadge(this.currentBadgeId).subscribe((data) => {
        if(data){
          this.toastLogService.successDialog('Successfully deleted badge!');
          //console.log(this.badges)
          this.getBadges();
          //console.log(this.badges)
        }
      })
    }
  }

}
