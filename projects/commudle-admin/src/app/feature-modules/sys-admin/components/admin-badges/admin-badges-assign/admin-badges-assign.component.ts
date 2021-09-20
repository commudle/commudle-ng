import { Component, OnInit } from '@angular/core';
import { IUserBadge } from 'projects/shared-models/user_badge.model';
import { SysAdminBadgesService } from 'projects/commudle-admin/src/app/feature-modules/sys-admin/services/sys-admin-badges.service';

@Component({
  selector: 'app-admin-badges-assign',
  templateUrl: './admin-badges-assign.component.html',
  styleUrls: ['./admin-badges-assign.component.scss']
})
export class AdminBadgesAssignComponent implements OnInit {

  user_badges: IUserBadge[] = [];
  page = 1;
  count = 10;
  total = -1;

  constructor(
    private sysAdminBadgesService : SysAdminBadgesService,
  ) { }

  ngOnInit(): void {
    this.getUserBadges();
  }

  getUserBadges(): void {
    if(this.user_badges.length !== this.total){
      this.sysAdminBadgesService.getUserBadges(this.page, this.count).subscribe((value) => {
        console.log(value)
        this.user_badges = this.user_badges.concat(value.user_badges);
        this.page = +value.page;
        this.total = +value.total;
        this.page += 1;
      })
    }
  }

}
