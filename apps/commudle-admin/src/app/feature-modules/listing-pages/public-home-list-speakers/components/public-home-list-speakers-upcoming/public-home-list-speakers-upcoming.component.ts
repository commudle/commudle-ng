import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { EDbModels } from '@commudle/shared-models';

@Component({
  selector: 'commudle-public-home-list-speakers-upcoming',
  templateUrl: './public-home-list-speakers-upcoming.component.html',
  styleUrls: ['./public-home-list-speakers-upcoming.component.scss'],
})
export class PublicHomeListSpeakersUpcomingComponent implements OnInit {
  @Input() parentType = EDbModels.KOMMUNITY;
  community: ICommunity[] = [];
  communityGroup: ICommunityGroup;
  upcomingEvents: IEvent[] = [];
  showSpinner = false;
  pageInfo: IPageInfo;
  total: number;
  limit = 5;
  page_info: IPageInfo;

  constructor(
    private eventsService: EventsService,
    private communityGroupsService: CommunityGroupsService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    if (this.parentType === EDbModels.KOMMUNITY) {
      this.getUpcomingEvents();
    } else if (this.parentType === EDbModels.COMMUNITY_GROUP) {
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getCommunityGroupEvents();
      });
    }
  }

  getUpcomingEvents() {
    this.showSpinner = true;
    this.eventsService.getEventsList('future', this.limit, this.pageInfo?.end_cursor).subscribe((data) => {
      if (data) {
        this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.total = data.total;
        this.pageInfo = data.page_info;
        this.showSpinner = false;
      }
    });
  }

  getCommunityGroupEvents() {
    this.showSpinner = true;
    this.communityGroupsService
      .pEvents(this.communityGroup.slug, this.limit, this.page_info?.end_cursor, 'future')
      .subscribe((data) => {
        this.upcomingEvents = this.upcomingEvents.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.page_info = data.page_info;
        this.showSpinner = false;
      });
  }
}
