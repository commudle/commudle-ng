/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { faMagnifyingGlass, faUser, faHashtag, faMessage, faBars } from '@fortawesome/free-solid-svg-icons';
import {
  EDbModels,
  EDiscussionType,
  ICommunity,
  IUser,
  IGroupedChannels,
  EUserRoles,
  IHackathon,
} from '@commudle/shared-models';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { CommunityChannelManagerService, SeoService, AuthService } from '@commudle/shared-services';
import { CommunitiesService } from 'apps/commudle-admin/src/app/services/communities.service';
import { ESidebarWidth } from 'apps/shared-components/sidebar/enum/sidebar.enum';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { SidebarService } from 'apps/shared-components/sidebar/service/sidebar.service';
@Component({
  selector: 'commudle-channel-forum-dashboard',
  templateUrl: './channel-forum-dashboard.component.html',
  styleUrls: ['./channel-forum-dashboard.component.scss'],
})
export class ChannelForumDashboardComponent implements OnInit, OnDestroy {
  @Input() showCommunityList = false;
  @Input() parent: ICommunity | ICommunityGroup | IHackathon;
  @Input() parentType: EDbModels;
  @Input() showForum = true;

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
  faBars = faBars;
  discussionType = EDiscussionType;

  discussionTypeForum = false;
  forumName: string;
  showForumData = false;
  isCommunityOrganizer = false;

  subscriptions: Subscription[] = [];
  currentRoute: string;
  token: string;
  emailToken: string;
  ESidebarWidth = ESidebarWidth;
  isSuperAdmin = false;
  sidebarEventName = 'channelForum';
  redirectUrl: string;
  constructor(
    private authWatchService: AuthService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService,
    private seoService: SeoService,
    private router: Router,
    private communitiesService: CommunitiesService,
    private communityGroupsService: CommunityGroupsService,
    public sidebarService: SidebarService,
  ) {}

  ngOnInit() {
    this.getQueryParamsData();
    this.checkDiscussionType();
    this.updateSelectedChannelOrForum();
    this.setMeta();
    this.getCurrentUser();
    this.sidebarService.setSidebarVisibility(this.sidebarEventName, true);
    this.setParent();

    if (this.discussionTypeForum && this.selectedChannelOrFormId) {
      this.checkSelectedForum();
    }
    this.communityChannelManagerService.getChannelForum();

    this.subscriptions.push(
      this.communityChannelManagerService.channelsByGroups$.subscribe((data) => {
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

    //set sidebar expanded state
    // eslint-disable-next-line no-prototype-builtins
    if (this.sidebarService.setSidebar$.hasOwnProperty(this.sidebarEventName)) {
      this.sidebarService.setSidebar$[this.sidebarEventName].subscribe((data) => {
        this.sidebarExpanded = data;
      });
    }
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getCurrentUser() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        this.communityChannelManagerService.setCurrentUser(data);
        if (this.currentUser.user_roles.includes(EUserRoles.SYSTEM_ADMINISTRATOR)) {
          this.isSuperAdmin = true;
        }
      }),
    );
  }

  setParent() {
    switch (this.parentType) {
      case EDbModels.KOMMUNITY:
        this.checkCommunityOrganizer();
        this.redirectUrl = `communities/${this.parent.slug}/channels`;
        break;
      case EDbModels.COMMUNITY_GROUP:
        this.redirectUrl = `orgs/${this.parent.slug}/channels`;
        this.checkCommunityGroupOrganizer();
        break;
      case EDbModels.HACKATHON:
        // eslint-disable-next-line no-case-declarations
        const hackathon = this.parent as IHackathon; // Cast parent to IHackathon
        this.redirectUrl = `communities/${hackathon.community.slug}/hackathons/${hackathon.slug}/channels`;
        this.checkHackathonAdminRoles();
        break;
      default:
        break;
    }
    this.communityChannelManagerService.setParent(this.parent, this.parentType);
  }

  checkCommunityOrganizer() {
    this.subscriptions.push(
      this.communitiesService.userManagedCommunities$.subscribe((data: ICommunity[]) => {
        if (data.find((cSlug) => cSlug.slug === this.parent.slug) !== undefined) {
          this.isCommunityOrganizer = true;
        }
      }),
    );
  }

  // TODO: handle case
  checkHackathonAdminRoles() {
    // Handle hackathon roles for channels
  }

  checkCommunityGroupOrganizer() {
    this.subscriptions.push(
      this.communityGroupsService.userManagedCommunityGroups$.subscribe((data) => {
        const communityGroups = data;
        communityGroups.forEach((communityGroup) => {
          if (communityGroup.id === this.parent.id) {
            this.isCommunityOrganizer = true;
            return;
          } else {
            this.isCommunityOrganizer = false;
          }
        });
      }),
    );
  }

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
    this.discussionTypeForum = this.router.url.includes('/forums');
    this.forumName = this.activatedRoute.snapshot.queryParamMap.get('category');
    this.selectedChannelOrFormId = this.activatedRoute.snapshot.params.community_channel_id;
  }

  updateSelectedChannelOrForum(channel?) {
    if (!this.discussionTypeForum && channel) {
      this.selectedChannelOrFormId = channel.id;
      this.channelsCards = false;
      this.channelMessage = true;
    } else if (this.discussionTypeForum && (this.forumName || channel)) {
      this.subscriptions.push(
        this.communityChannelManagerService.forumsByGroup$.subscribe((data) => {
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

  toggleSidebar() {
    this.sidebarService.toggleSidebarVisibility(this.sidebarEventName);
  }
}
