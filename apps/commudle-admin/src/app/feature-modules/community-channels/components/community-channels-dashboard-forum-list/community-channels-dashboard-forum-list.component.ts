import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
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
  @Input() parent: ICommunity | ICommunityGroup;
  @Output() updateSelectedForum = new EventEmitter<any>();

  subscriptions: Subscription[] = [];
  communityForums: EGroupedCommunityChannels;
  hasForms = false;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelManagerService.forumsByGroup$.subscribe((data) => {
        this.communityForums = data;
        if (this.communityForums) {
          Object.keys(this.communityForums).length > 0 ? (this.hasForms = true) : (this.hasForms = false);
        }
      }),
    );
  }

  selectedCommunityChannel(forumName) {
    this.updateSelectedForum.emit(forumName.value);
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { category: forumName ? forumName.key : 'general' },
      queryParamsHandling: 'merge',
    });
    this.communityChannelManagerService.setForum(forumName.value);
  }
}
