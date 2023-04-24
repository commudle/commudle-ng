import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss'],
})
export class ChannelsComponent implements OnInit, OnDestroy {
  channels: ICommunityChannel[] = [];
  subscriptions: Subscription[] = [];

  isLoading = true;

  constructor(private communityGroupsService: CommunityGroupsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.getChannels(data.community_group_id);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getChannels(slug) {
    this.subscriptions.push(
      this.communityGroupsService.communityChannels(slug).subscribe((data) => {
        this.channels = this.channels.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.isLoading = false;
      }),
    );
  }
}
