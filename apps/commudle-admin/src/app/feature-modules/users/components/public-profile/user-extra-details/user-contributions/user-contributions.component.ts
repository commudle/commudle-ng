import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { ILab } from 'apps/shared-models/lab.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-contributions',
  templateUrl: './user-contributions.component.html',
  styleUrls: ['./user-contributions.component.scss'],
})
export class UserContributionsComponent implements OnChanges, OnDestroy {
  @Input() user: IUser;

  labs: ILab[] = [];
  communities: IUserRolesUser[] = [];
  builds: ICommunityBuild[] = [];
  pastEvents: ISpeakerResource[] = [];

  subscriptions: Subscription[] = [];

  viewMoreCommunitiesSection = true;
  footerCommunitiesCardText: string;

  constructor(private appUsersService: AppUsersService, public userProfileMenuService: UserProfileMenuService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.getPastEvents();
      this.getCommunities();
      this.getLabs();
      this.getBuilds();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getPastEvents(): void {
    this.subscriptions.push(
      this.appUsersService.speakerResources(this.user.username).subscribe((value) => {
        this.pastEvents = value.speaker_resources;
        this.userProfileMenuService.addMenuItem('talksAtEvents', this.pastEvents.length > 0);
      }),
    );
  }

  getCommunities(): void {
    this.subscriptions.push(
      this.appUsersService.communities(this.user.username).subscribe((value) => {
        // TODO: If some community is undefined then remove it, is that required?
        this.communities = value.user_roles_users.filter((community) => community.community);
        this.userProfileMenuService.addMenuItem('communities', this.communities.length > 0);
        this.footerCommunitiesCardText = `View More (${this.communities.length - 6})`;
      }),
    );
  }

  getLabs(): void {
    this.subscriptions.push(
      this.appUsersService.labs(this.user.username).subscribe((value) => {
        this.labs = value.labs;
        this.userProfileMenuService.addMenuItem('labs', this.labs.length > 0);
      }),
    );
  }

  getBuilds(): void {
    this.subscriptions.push(
      this.appUsersService.communityBuilds(this.user.username).subscribe((value) => {
        this.builds = value.community_builds;
        this.userProfileMenuService.addMenuItem('builds', this.builds.length > 0);
      }),
    );
  }

  viewMoreCommunities() {
    this.viewMoreCommunitiesSection = !this.viewMoreCommunitiesSection;
    if (!this.viewMoreCommunitiesSection) {
      this.footerCommunitiesCardText = `View Less`;
    } else {
      this.footerCommunitiesCardText = `View More (${this.communities.length - 6})`;
    }
  }
}
