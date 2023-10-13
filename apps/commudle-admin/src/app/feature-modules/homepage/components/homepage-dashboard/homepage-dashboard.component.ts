import { Component, OnInit } from '@angular/core';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';

@Component({
  selector: 'commudle-homepage-dashboard',
  templateUrl: './homepage-dashboard.component.html',
  styleUrls: ['./homepage-dashboard.component.scss'],
})
export class HomepageDashboardComponent implements OnInit {
  currentUser: ICurrentUser;
  staticAssets = staticAssets;
  userProfileDetails: IUserStat;
  constructor(private authWatchService: LibAuthwatchService, private appUsersService: AppUsersService) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
    });
    this.appUsersService.getProfileStats().subscribe((data) => {
      this.userProfileDetails = data;
    });
  }
}
