import { Component, Input, OnInit } from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
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
    private userProfileManagerService: UserProfileManagerService,
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
