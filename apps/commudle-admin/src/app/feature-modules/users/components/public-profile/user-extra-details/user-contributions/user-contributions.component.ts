import { Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { ICommunityBuild } from 'apps/shared-models/community-build.model';
import { ILab } from 'apps/shared-models/lab.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { Subscription } from 'rxjs';
import { faLightbulb, faCalendar, faUsers, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import { IEvent } from 'apps/shared-models/event.model';
import { EDbModels } from '@commudle/shared-models';

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
  attendedEvents: IEvent[] = [];
  pastEvents: IEvent[] = [];

  subscriptions: Subscription[] = [];

  viewMoreEventsSection = true;
  viewMoreCommunitiesSection = true;
  footerCommunitiesCardText: string;
  footerEventsCardText: string;
  faLightbulb = faLightbulb;
  faCalendar = faCalendar;
  faUsers = faUsers;
  faBookOpen = faBookOpen;
  EDbModels = EDbModels;

  constructor(private appUsersService: AppUsersService, public userProfileMenuService: UserProfileMenuService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.pastEvents = [];
      this.getPastEvents();
      this.getCommunities();
      this.getLabs();
      this.getBuilds();
      this.getAttendedEvents();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getPastEvents(): void {
    this.subscriptions.push(
      this.appUsersService.getSpeakerResources(this.user.username).subscribe((value) => {
        this.pastEvents = this.pastEvents.concat(value.page.reduce((acc, value) => [...acc, value.data], []));
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

  getAttendedEvents(): void {
    this.subscriptions.push(
      this.appUsersService.getAttendedEvents(this.user.id).subscribe((value) => {
        this.attendedEvents = value.events;
        this.userProfileMenuService.addMenuItem('attendedEvents', this.attendedEvents.length > 0);
        this.footerEventsCardText = `View More`;
      }),
    );
  }

  viewMoreAttendedEvents() {
    this.viewMoreEventsSection = !this.viewMoreEventsSection;
    if (!this.viewMoreEventsSection) {
      this.footerEventsCardText = `View Less`;
    } else {
      this.footerEventsCardText = `View More`;
    }
  }
}
