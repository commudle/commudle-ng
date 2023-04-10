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
  events: IEvent[] = [];
  UpcomingEvents: IEvent[] = [];

  isLoading = true;
  limit = 6;
  page_info: IPageInfo;
  community_group_id: number;

  subscriptions: Subscription[] = [];

  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.community_group_id = data.community_group_id;
        this.getEvents();
        this.getUpcomingEvents();
      }),
    );
  }

  getEvents() {
    this.subscriptions.push(
      this.communityGroupsService
        .pEvents(this.community_group_id, this.limit, this.page_info?.end_cursor, this.page_info?.end_cursor, 'past')
        .subscribe((data) => {
          this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoading = false;
        }),
    );
  }

  getUpcomingEvents() {
    this.subscriptions.push(
      this.communityGroupsService.pEvents(this.community_group_id, this.limit, '', '', 'future').subscribe((data) => {
        this.UpcomingEvents = this.UpcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.page_info = data.page_info;
        // this.isLoading = false;
      }),
    );
  }
}
