import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { faUsers, faCalendar, faHashtag } from '@fortawesome/free-solid-svg-icons';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';

@Component({
  selector: 'commudle-community-group-activity',
  templateUrl: './community-group-activity.component.html',
  styleUrls: ['./community-group-activity.component.scss'],
})
export class CommunityGroupActivityComponent implements OnInit, OnDestroy {
  faUsers = faUsers;
  faCalendar = faCalendar;
  faHashtag = faHashtag;
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  channels: ICommunityChannel[] = [];
  page_info: IPageInfo;
  subscriptions: Subscription[] = [];
  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.getActiveCommunitiesAndChannels(data.community_group_id);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getActiveCommunitiesAndChannels(communityGroupId) {
    this.communityGroupsService.activeCommunityAndChannels(communityGroupId).subscribe((data) => {
      this.communities = data.communities;
      this.channels = data.community_channels;
      this.page_info = data.page_info;
    });
  }
}
