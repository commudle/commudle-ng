/* eslint-disable no-case-declarations */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faMagnifyingGlass, faUser, faHashtag, faMessage } from '@fortawesome/free-solid-svg-icons';
import {
  EDbModels,
  EDiscussionType,
  ICommunity,
  ICommunityChannel,
  IUser,
  IGroupedChannels,
} from '@commudle/shared-models';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { CommunityChannelManagerService, SeoService, AuthService } from '@commudle/shared-services';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';

// interface IGroupedChannels {
//   [groupName: string]: ICommunityChannel[];
// }
@Component({
  selector: 'commudle-channel-forum-dashboard',
  templateUrl: './channel-forum-dashboard.component.html',
  styleUrls: ['./channel-forum-dashboard.component.scss'],
})
export class ChannelForumDashboardComponent implements OnInit, OnDestroy {
  @Input() selectedCommunity: ICommunity;
  @Input() showCommunityList = false;
  @Input() parent: ICommunity | ICommunityGroup;
  @Input() parentType: EDbModels;

  communityForums: IGroupedChannels;
  currentUser: IUser;
  channels: IGroupedChannels;
  channelsQueried = false;
  selectedChannelOrFormId: number;
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

  discussionTypeForum = false;
  forumName: string;
  showForumData = false;
  isCommunityOrganizer = false;

  subscriptions: Subscription[] = [];
  currentRoute: string;
  token: string;
  emailToken: string;

  constructor(
    private authWatchService: AuthService,
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
    // this.checkCommunityOrganizer();

    this.sidebarExpanded = !(window.innerWidth <= 640);

    if (this.discussionTypeForum && this.selectedChannelOrFormId) {
      this.checkSelectedForum();
    }
    this.communityChannelManagerService.getChannelForum();

    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        this.channels = data;
        if (data) {
          this.channelsQueried = true;
          if (this.selectedChannelOrFormId) {
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

  // checkCommunityOrganizer() {
  //   this.subscriptions.push(
  //     this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
  //       if (data.find((cSlug) => cSlug.slug === this.selectedCommunity.slug) !== undefined) {
  //         this.isCommunityOrganizer = true;
  //       }
  //     }),
  //   );
  // }

  checkDiscussionType() {
    if (this.discussionTypeForum) {
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
    this.token = this.activatedRoute.snapshot.params.token;
    this.emailToken = this.activatedRoute.snapshot.params.email_token;
    this.discussionTypeForum = this.activatedRoute.snapshot.url.join('/').includes('forums');
    this.forumName = this.activatedRoute.snapshot.queryParamMap.get('category');
    this.selectedChannelOrFormId = this.activatedRoute.snapshot.params.community_channel_id;
  }

  getCurrentUser() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.communityChannelManagerService.setCurrentUser(data);
      }),
    );
  }

  updateSelectedChannelOrForum(channel?) {
    if (!this.discussionTypeForum && channel) {
      this.selectedChannelOrFormId = channel.id;
      this.channelsCards = false;
      this.channelMessage = true;
    } else if (this.discussionTypeForum && (this.forumName || channel)) {
      this.subscriptions.push(
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
        }),
      );
      this.forumsCards = false;
      this.forumsNamesList = true;
    }
  }

  openChannelOrForums(discussionType: EDiscussionType) {
    const currentUrl = this.router.url;
    let newUrl: string;
    switch (discussionType) {
      case EDiscussionType.CHANNEL:
        this.forumsNamesList = false;
        this.forumMessage = false;
        this.forumsList = false;
        newUrl = currentUrl.replace(/\/(forums|channels)(\/\d+)?(\?.*)?$/, '/channels');
        break;
      case EDiscussionType.FORUM:
        this.channelsList = false;
        this.forumsNamesList = false;
        this.forumMessage = false;
        this.forumsList = true;
        newUrl = currentUrl.replace(/\/(forums|channels)(\/\d+)?(\?.*)?$/, '/forums');
        break;
      default:
        console.error(`Unable to redirect to ${{ discussionType }}`);
    }
    this.router.navigate([newUrl]);
    this.checkDiscussionType();
  }

  checkSelectedForum() {
    this.forumsNamesList = false;
    this.forumsCards = false;
    this.forumMessage = true;
  }

  // The `setMeta` function sets meta tags for SEO with information related to the selected community.
  setMeta() {
    this.seoService.setTags(
      `Channels - ${this.parent.name}`,
      `Interact with members in channels for ${this.parent.name}! Share knowledge, network & grow together!`,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
