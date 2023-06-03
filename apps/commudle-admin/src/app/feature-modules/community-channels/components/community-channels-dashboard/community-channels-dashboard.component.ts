import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { faMagnifyingGlass, faUser, faHashtag, faMessage } from '@fortawesome/free-solid-svg-icons';
import { DiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';

@Component({
  selector: 'app-community-channels-dashboard',
  templateUrl: './community-channels-dashboard.component.html',
  styleUrls: ['./community-channels-dashboard.component.scss'],
})
export class CommunityChannelsDashboardComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedCommunity: ICommunity;
  @Input() showCommunityList = false;
  currentUser: ICurrentUser;
  communityChannels;
  communityForums;
  channelsQueried = false;
  selectedChannelId: number;
  showChannelsComponent = false;
  showForumsComponent = false;
  sidebarExpanded = true;

  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  faHashtag = faHashtag;
  faMessage = faMessage;
  discussionType = DiscussionType;

  discussionTypeParam: string;
  showForumData = false;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService,
    private seoService: SeoService,
    private router: Router,
  ) {}

  ngOnInit() {
    // this.checkSelectedChannel();
    this.discussionTypeParam = this.activatedRoute.snapshot.queryParamMap.get('discussion-type');
    if (this.discussionTypeParam === this.discussionType.FORUM) {
      this.showForumData = true;
    }
    this.setMeta();
    this.communityChannelManagerService.setCommunity(this.selectedCommunity);
    this.getCurrentUser();
    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        this.communityChannels = data;
        if (data) {
          this.channelsQueried = true;
          if (this.activatedRoute.snapshot.params.community_channel_id) {
            this.selectedChannelId = this.activatedRoute.snapshot.params.community_channel_id;
            this.showChannelsComponent = true;
          }
          if (this.activatedRoute.snapshot.params.community_channel_id && this.discussionTypeParam) {
            this.selectedChannelId = this.activatedRoute.snapshot.params.community_channel_id;
            this.showForumsComponent = true;
          }
        }
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.discussionTypeParam = this.activatedRoute.snapshot.queryParamMap.get('discussion-type');
    if (this.discussionTypeParam === this.discussionType.FORUM) {
      this.showForumData = true;
    } else {
      this.showForumData = false;
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getCurrentUser() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.communityChannelManagerService.setCurrentUser(data);
      }),
    );
  }

  setMeta() {
    this.seoService.setTags(
      `Channels - ${this.selectedCommunity.name}`,
      `Interact with members in channels for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`,
      this.selectedCommunity.logo_path,
    );
  }

  checkSelectedChannel(channel?: ICommunityChannel) {
    if (channel) this.selectedChannelId = channel.id;
    if (channel) {
      this.showChannelsComponent = true;
    }
    if (this.discussionType) {
      this.showForumsComponent = true;
    }
  }

  openForum() {
    this.router.navigate([], {
      queryParams: { 'discussion-type': 'forum' },
    });
    this.showForumData = true;
  }

  openChannel() {
    this.router.navigate([], {
      queryParams: { 'discussion-type': undefined },
    });
    this.showForumData = false;
  }
}
