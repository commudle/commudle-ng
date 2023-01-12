import { Component, Input, OnInit } from '@angular/core';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-basic-user-profile',
  templateUrl: './basic-user-profile.component.html',
  styleUrls: ['./basic-user-profile.component.scss'],
})
export class BasicUserProfileComponent implements OnInit {
  @Input() pagePadding = true;
  currentUser: ICurrentUser;

  constructor(
    private authWatchService: LibAuthwatchService,
    public userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
      }
    });
  }

  updateUserDetails() {
    this.userProfileManagerService.updateUserDetails(true);
  }
}
