import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';

@Component({
  selector: 'commudle-community-group-channels',
  templateUrl: './community-group-channels.component.html',
  styleUrls: ['./community-group-channels.component.scss'],
})
export class CommunityGroupChannelsComponent implements OnInit {
  subscriptions: Subscription[] = [];
  channels: ICommunityChannel[] = [];

  limit = 10;
  isLoading = true;
  community_group_slug: string;
  page_info: IPageInfo;

  constructor(private activatedRoute: ActivatedRoute, private communityGroupsService: CommunityGroupsService) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.community_group_slug = data.community_group.slug;
        this.getChannels();
      }),
    );
  }

  getChannels() {
    this.communityGroupsService
      .pChannels(this.community_group_slug, this.limit, this.page_info?.end_cursor)
      .subscribe((data) => {
        this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.page_info = data.page_info;
        this.isLoading = false;
      });
  }
}
