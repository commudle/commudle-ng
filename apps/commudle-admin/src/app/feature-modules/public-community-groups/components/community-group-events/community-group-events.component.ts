import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-community-group-events',
  templateUrl: './community-group-events.component.html',
  styleUrls: ['./community-group-events.component.scss'],
})
export class CommunityGroupEventsComponent implements OnInit {
  communityGroup: ICommunityGroup;
  pastEvents: IEvent[] = [];
  upcomingEvents: IEvent[] = [];
  subscriptions: Subscription[] = [];
  total: number;

  pastPageInfo: IPageInfo;
  upcomingPageInfo: IPageInfo;

  limit = 6;
  isLoadingUpcoming = false;
  isLoadingPast = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getPastEvents();
        this.getUpcomingEvents();
        this.setMeta();
      }),
    );
  }

  getPastEvents() {
    this.isLoadingPast = true;
    this.subscriptions.push(
      this.communityGroupsService
        .pEvents(this.communityGroup.slug, this.limit, this.pastPageInfo?.end_cursor, 'past')
        .subscribe((data) => {
          this.pastEvents = this.pastEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.pastPageInfo = data.page_info;
          this.total = data.total;
          this.isLoadingPast = false;
        }),
    );
  }

  getUpcomingEvents() {
    this.isLoadingUpcoming = true;
    this.subscriptions.push(
      this.communityGroupsService
        .pEvents(this.communityGroup.slug, this.limit, this.upcomingPageInfo?.end_cursor, 'future')
        .subscribe((data) => {
          this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.upcomingPageInfo = data.page_info;
          this.total = data.total;
          this.isLoadingUpcoming = false;
        }),
    );
  }

  setMeta() {
    this.seoService.setTags(
      `Events | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
    );
  }
}
