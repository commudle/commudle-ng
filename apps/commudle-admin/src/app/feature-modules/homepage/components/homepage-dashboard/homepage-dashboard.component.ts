import { Component, OnInit } from '@angular/core';
import { staticAssets } from 'apps/commudle-admin/src/assets/static-assets';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUser } from 'apps/shared-models/user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'commudle-homepage-dashboard',
  templateUrl: './homepage-dashboard.component.html',
  styleUrls: ['./homepage-dashboard.component.scss'],
})
export class HomepageDashboardComponent implements OnInit {
  user: IUser;
  currentUser: ICurrentUser;
  staticAssets = staticAssets;
  constructor(private authWatchService: LibAuthwatchService) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data));
  }
}
