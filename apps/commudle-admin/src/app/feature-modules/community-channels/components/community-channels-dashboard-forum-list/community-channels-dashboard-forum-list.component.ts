import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { Subscription } from 'rxjs';

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'commudle-community-channels-dashboard-forum-list',
  templateUrl: './community-channels-dashboard-forum-list.component.html',
  styleUrls: ['./community-channels-dashboard-forum-list.component.scss'],
})
export class CommunityChannelsDashboardForumListComponent implements OnInit {
  subscriptions: Subscription[] = [];
  communityForums: EGroupedCommunityChannels;
  selectedCommunity: ICommunity;

  @Output() updateSelectedChannel = new EventEmitter<any>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelManagerService.communityForums$.subscribe((data) => {
        this.communityForums = data;
        console.log(data);
      }),
    );
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.selectedCommunity = data.community;
        // this.getChannels();
        // this.communityChannelManagerService.setCommunityListview(false);
      }),
    );
  }

  selectedCommunityChannel(forumName) {
    this.updateSelectedChannel.emit();
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { 'discussion-type': 'forum', 'forum-name': forumName ? forumName.key : 'general' },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.communityChannelManagerService.setForum(forumName.value);
  }
}
