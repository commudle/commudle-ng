import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Params, Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { faMagnifyingGlass, faUser, faHashtag, faMessage } from '@fortawesome/free-solid-svg-icons';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}
@Component({
  selector: 'app-community-channels-dashboard',
  templateUrl: './community-channels-dashboard.component.html',
  styleUrls: ['./community-channels-dashboard.component.scss'],
})
export class CommunityChannelsDashboardComponent implements OnInit, OnDestroy {
  @Input() selectedCommunity: ICommunity;
  @Input() showCommunityList = false;
  @Input() communityForums: EGroupedCommunityChannels;
  currentUser: ICurrentUser;
  communityChannels;
  channelsQueried = false;
  selectedChannelId: number;
  showChannelsComponent = false;
  showForumsComponent = false;
  showForumMessages = false;
  sidebarExpanded = true;

  channelsList = true;
  channelsCards = true;
  channelMessage = false;

  forumsList = false;
  forumsCards = false;
  forumsNamesList = false;
  forumMessage = false;

  faMagnifyingGlass = faMagnifyingGlass;
  faUser = faUser;
  faHashtag = faHashtag;
  faMessage = faMessage;
  discussionType = EDiscussionType;

  discussionTypeParam: string;
  forumName: string;
  showForumData = false;
  isCommunityOrganizer = false;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService,
    private seoService: SeoService,
    private router: Router,
    private communitiesService: CommunitiesService,
  ) {}

  ngOnInit() {
    this.getQueryParamsData();
    this.checkDiscussionType();
    this.updateSelectedChannelOrForum();
    this.setMeta();
    this.getCurrentUser();
    this.checkCommunityOrganizer();

    if (this.discussionTypeParam === this.discussionType.FORUM && this.selectedChannelId) {
      this.checkSelectedForum();
    }
    this.communityChannelManagerService.setCommunity(this.selectedCommunity);

    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        this.communityChannels = data;
        if (data) {
          this.channelsQueried = true;
          if (this.selectedChannelId) {
            this.channelsCards = false;
            this.channelMessage = true;
          }
        }
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  checkCommunityOrganizer() {
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        if (data.find((cSlug) => cSlug.slug === this.selectedCommunity.slug) !== undefined) {
          this.isCommunityOrganizer = true;
        }
      }),
    );
  }

  checkDiscussionType() {
    if (this.discussionTypeParam === this.discussionType.FORUM) {
      this.channelsList = false;
      this.forumsList = true;
      this.channelsCards = false;
      this.forumsCards = true;
    } else {
      this.channelsList = true;
      this.forumsList = false;
      this.channelsCards = true;
      this.forumsCards = false;
    }
  }

  getQueryParamsData() {
    this.discussionTypeParam = this.activatedRoute.snapshot.queryParamMap.get('discussion-type');
    this.forumName = this.activatedRoute.snapshot.queryParamMap.get('forum-name');
    this.selectedChannelId = this.activatedRoute.snapshot.params.community_channel_id;
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

  updateSelectedChannelOrForum(channel?) {
    if (this.discussionTypeParam !== this.discussionType.FORUM && channel) {
      this.selectedChannelId = channel.id;
      this.channelsCards = false;
      this.channelMessage = true;
    } else if (this.discussionTypeParam === this.discussionType.FORUM && (this.forumName || channel)) {
      this.communityChannelManagerService.communityForums$.subscribe((data) => {
        this.communityForums = data;
        if (this.communityForums) {
          const selectedForum = Object.keys(this.communityForums)
            .filter((key) => key === this.forumName)
            .reduce((obj, key) => {
              obj[key] = data[key];
              return data[key];
            }, {});
          this.communityChannelManagerService.setForum(selectedForum);
        }
      });
      this.forumsCards = false;
      this.forumsNamesList = true;
    }
  }

  openChannelOrForums(discussionType) {
    this.discussionTypeParam = discussionType;
    if (discussionType === this.discussionType.CHANNEL) {
      this.forumsNamesList = false;
      this.forumMessage = false;
      this.forumsList = false;
      this.router.navigate([`communities/${this.selectedCommunity.slug}/channels`]);
    } else if (discussionType === this.discussionType.FORUM) {
      this.channelsList = false;
      this.forumsNamesList = false;
      this.forumMessage = false;
      this.forumsList = true;
      this.router.navigate([`communities/${this.selectedCommunity.slug}/channels`], {
        queryParams: { 'discussion-type': 'forum' },
      });
    }
    this.checkDiscussionType();
  }

  checkSelectedForum() {
    this.forumsNamesList = false;
    this.forumsCards = false;
    this.forumMessage = true;
  }
}
