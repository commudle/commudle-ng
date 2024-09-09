import { Component, OnInit } from '@angular/core';
import { ICommunity, IEvent, IPageInfo } from '@commudle/shared-models';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { IUserStat } from 'libs/shared/models/src/lib/user-stats.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  currentUser: ICurrentUser;
  userProfileDetails: IUserStat;
  managedCommunities: ICommunity[] = [];
  subscriptions: Subscription[] = [];
  page_info: IPageInfo;
  total: number;
  limit = 4;
  upcomingEvents: IEvent[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private appUsersService: AppUsersService,
    private communitiesService: CommunitiesService,
    private eventsService: EventsService,
  ) {}

  ngOnInit(): void {
    this.getUserDetails();
    this.getCommunitiesData();
    this.getUpcomingEvents();
  }

  getUserDetails() {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      if (this.currentUser) {
        this.appUsersService.getProfileStats().subscribe((data) => {
          this.userProfileDetails = data;
        });
      }
    });
  }

  getCommunitiesData() {
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        this.managedCommunities = data;
      }),
    );
  }

  getUpcomingEvents() {
    this.eventsService.getEventsList('future', this.limit, this.page_info?.end_cursor).subscribe((data) => {
      if (data) {
        this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.total = data.total;
        this.page_info = data.page_info;
      }
    });
  }
}
