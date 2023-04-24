import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faUsers, faCalendar, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { IEvent } from 'apps/shared-models/event.model';

@Component({
  selector: 'commudle-community-group-activity',
  templateUrl: './community-group-activity.component.html',
  styleUrls: ['./community-group-activity.component.scss'],
})
export class CommunityGroupActivityComponent implements OnInit, OnDestroy {
  limit = 6;
  communityGroupId: number;
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  channels: ICommunityChannel[] = [];
  events: IEvent[] = [];
  page_info: IPageInfo;

  //icons
  faUsers = faUsers;
  faCalendar = faCalendar;
  faHashtag = faHashtag;

  isLoading = true;
  isLoadingEvents = false;
  subscriptions: Subscription[] = [];
  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.communityGroupId = data.community_group_id;
        this.getActiveCommunitiesAndChannels();
        this.getEvents();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getActiveCommunitiesAndChannels() {
    this.subscriptions.push(
      this.communityGroupsService.activeCommunityAndChannels(this.communityGroupId).subscribe((data) => {
        this.communities = data.communities;
        this.channels = data.community_channels;
        this.isLoading = false;
      }),
    );
  }

  getEvents() {
    this.isLoadingEvents = true;
    this.events = [];
    this.subscriptions.push(
      this.communityGroupsService
        .pEvents(this.communityGroupId, this.limit, this.page_info?.end_cursor, this.page_info?.start_cursor, 'future')
        .subscribe((data) => {
          this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoadingEvents = false;
        }),
    );
  }

  getPreviousEvents() {
    this.page_info.start_cursor = '';
    this.getEvents();
  }

  getNextEvents() {
    this.page_info.end_cursor = '';
    this.getEvents();
  }
}
