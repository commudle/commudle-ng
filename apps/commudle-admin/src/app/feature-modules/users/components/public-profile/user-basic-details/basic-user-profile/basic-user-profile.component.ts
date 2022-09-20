import { Component, Input, OnInit } from '@angular/core';
import { ICurrentUser } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { UserProfileManagerService } from '../../../../services/user-profile-manager.service';

@Component({
  selector: 'commudle-basic-user-profile',
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
