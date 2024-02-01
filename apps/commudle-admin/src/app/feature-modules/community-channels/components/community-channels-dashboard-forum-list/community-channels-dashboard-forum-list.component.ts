import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@commudle/shared-services';
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
  @Input() community: ICommunity;
  @Output() updateSelectedForum = new EventEmitter<any>();
  hasForms = false;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.communityChannelManagerService.communityForums$.subscribe((data) => {
        this.communityForums = data;
        Object.keys(this.communityForums).length > 0 ? (this.hasForms = true) : (this.hasForms = false);
      }),
    );
    this.setMeta();
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

  setMeta() {
    this.seoService.setTags(
      `Forums - ${this.community.name}`,
      `Forum discussions for ${this.community.name}`,
      this.community.logo_path,
    );
  }
}
