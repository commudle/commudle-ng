import {Component, Input, OnInit} from '@angular/core';
import {IUser} from 'projects/shared-models/user.model';
import {ILab} from 'projects/shared-models/lab.model';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';
import {IUserRolesUser} from 'projects/shared-models/user_roles_user.model';

@Component({
  selector: 'app-user-content',
  templateUrl: './user-content.component.html',
  styleUrls: ['./user-content.component.scss']
})
export class UserContentComponent implements OnInit {

  @Input() user: IUser;

  labs: ILab[] = [];
  communities: IUserRolesUser[] = [];
  builds: ICommunityBuild[] = [];

  constructor(
    private appUsersService: AppUsersService
  ) {
  }

  ngOnInit(): void {
    // Get the user's labs
    this.appUsersService.labs(this.user.username).subscribe(value => this.labs = value.labs);
    // Get the user's communities
    this.appUsersService.communities(this.user.username).subscribe(value => this.communities = value.user_roles_users);
    // Get the user's builds
    this.appUsersService.communityBuilds(this.user.username).subscribe(value => this.builds = value.community_builds);
  }

}
