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
import { SeoService } from 'apps/shared-services/seo.service';
import { IFeaturedItems } from 'apps/shared-models/featured-items.model';

@Component({
  selector: 'commudle-community-group-activity',
  templateUrl: './community-group-activity.component.html',
  styleUrls: ['./community-group-activity.component.scss'],
})
export class CommunityGroupActivityComponent implements OnInit, OnDestroy {
  limit = 6;
  communityGroup: ICommunityGroup;
  communities: IFeaturedItems[] = [];
  channels: ICommunityChannel[] = [];
  events: IEvent[] = [];
  subscriptions: Subscription[] = [];

  page_info: IPageInfo;

  //font-awesome icons
  faUsers = faUsers;
  faCalendar = faCalendar;
  faHashtag = faHashtag;

  isLoading = true;
  isLoadingEvents = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.communityGroup = data.community_group;
        this.getActiveCommunitiesAndChannels();
        this.getEvents();
        this.setMeta();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getActiveCommunitiesAndChannels() {
    this.subscriptions.push(
      this.communityGroupsService.activeCommunityAndChannels(this.communityGroup.slug).subscribe((data) => {
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
        .pEvents(
          this.communityGroup.slug,
          this.limit,
          this.page_info?.end_cursor,
          this.page_info?.start_cursor,
          'future',
        )
        .subscribe((data) => {
          this.events = this.events.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoadingEvents = false;
        }),
    );
  }

  setMeta(): void {
    this.seoService.setTags(
      `Activity | ${this.communityGroup.name}`,
      this.communityGroup.mini_description,
      this.communityGroup.logo.i350,
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
