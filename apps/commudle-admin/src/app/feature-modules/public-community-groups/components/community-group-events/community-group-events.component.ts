import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-group-events',
  templateUrl: './community-group-events.component.html',
  styleUrls: ['./community-group-events.component.scss'],
})
export class CommunityGroupEventsComponent implements OnInit {
  pastEvents: IEvent[] = [];
  upcomingEvents: IEvent[] = [];

  isLoadingUpcoming = false;
  isLoadingPast = false;

  limit = 6;
  pastPageInfo: IPageInfo;
  upcomingPageInfo: IPageInfo;

  community_group_id: number;

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.community_group_id = data.community_group_id;
        this.getPastEvents();
        this.getUpcomingEvents();
      }),
    );
  }

  getPastEvents() {
    this.isLoadingPast = true;
    this.subscriptions.push(
      this.communityGroupsService
        .pEvents(this.community_group_id, this.limit, '', this.pastPageInfo?.end_cursor, 'past')
        .subscribe((data) => {
          this.pastEvents = this.pastEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.pastPageInfo = data.page_info;
          this.isLoadingPast = false;
        }),
    );
  }

  getUpcomingEvents() {
    this.isLoadingUpcoming = true;
    this.subscriptions.push(
      this.communityGroupsService
        .pEvents(this.community_group_id, this.limit, '', this.upcomingPageInfo?.end_cursor, 'future')
        .subscribe((data) => {
          this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.upcomingPageInfo = data.page_info;
          this.isLoadingUpcoming = false;
        }),
    );
  }
}
