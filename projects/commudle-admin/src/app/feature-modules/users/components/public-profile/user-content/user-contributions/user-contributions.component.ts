import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppUsersService} from 'projects/commudle-admin/src/app/services/app-users.service';
import {IUser} from 'projects/shared-models/user.model';
import {ILab} from 'projects/shared-models/lab.model';
import {ICommunityBuild} from 'projects/shared-models/community-build.model';
import {IUserRolesUser} from 'projects/shared-models/user_roles_user.model';

@Component({
  selector: 'app-user-contributions',
  templateUrl: './user-contributions.component.html',
  styleUrls: ['./user-contributions.component.scss']
})
export class UserContributionsComponent implements OnInit, OnDestroy {

  @Input() user: IUser;

  labs: ILab[];
  communities: IUserRolesUser[];
  builds: ICommunityBuild[];

  subscriptions: Subscription[] = [];

  constructor(
    private appUsersService: AppUsersService
  ) {
  }

  ngOnInit(): void {
    // Get the user's labs
    this.subscriptions.push(this.appUsersService.labs(this.user.username).subscribe(value => {
      this.labs = value.labs;
    }));
    // Get the user's communities
    this.subscriptions.push(this.appUsersService.communities(this.user.username).subscribe(value => {
      this.communities = value.user_roles_users;
      // TODO: If some community is undefined then remove it, is it required?
      this.communities.forEach(community => {
        if (!community.community) {
          this.communities.splice(this.communities.indexOf(community), 1);
        }
      })
    }));
    // Get the user's builds
    this.subscriptions.push(this.appUsersService.communityBuilds(this.user.username).subscribe(value => {
      this.builds = value.community_builds;
    }));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

}
