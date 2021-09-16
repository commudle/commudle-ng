import { Component, OnInit } from '@angular/core';
import { SysAdminBadgesService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-badges.service';
import { IBadge } from 'projects/shared-models/badge.model';

@Component({
  selector: 'app-admin-badges-list',
  templateUrl: './admin-badges-list.component.html',
  styleUrls: ['./admin-badges-list.component.scss']
})
export class AdminBadgesListComponent implements OnInit {

  currentBadgeId;
  badges: IBadge[] = [];
  page = 1;
  count = 5;
  total = -1;

  constructor(
    private sysAdminBadgesService : SysAdminBadgesService
  ) { }

  ngOnInit(): void {
    this.getBadges();
  }

  getBadges(): void {
    if (this.badges.length !== this.total) {
       this.sysAdminBadgesService.getAllBadges(this.page, this.count).subscribe((value) => {
         console.log(value)
        // this.badges = this.badges.concat(value.badges);
        // this.page = +value.page;
        // this.total = +value.total;
        // this.page += 1;
      });
    }
  }

}
