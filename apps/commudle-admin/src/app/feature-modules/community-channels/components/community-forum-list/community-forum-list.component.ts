/* eslint-disable @nx/enforce-module-boundaries */
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { NewCommunityChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/new-community-channel/new-community-channel.component';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { EDbModels, ICommunityGroup, IHackathon } from '@commudle/shared-models';

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'app-community-forum-list',
  templateUrl: './community-forum-list.component.html',
  styleUrls: ['./community-forum-list.component.scss'],
})
export class CommunityForumListComponent implements OnInit, OnDestroy {
  @Input() showCommunityBadge = false;
  @Input() isCommunityOrganizer = false;
  @Input() selectedForumName: string;

  communityForums: EGroupedCommunityChannels;
  selectedChannel: ICommunityChannel;
  currentUser: ICurrentUser;
  EUserRoles = EUserRoles;
  communityRoles = [];
  channelsRoles = {};
  channelNotifications = [];
  discussionType = EDiscussionType;

  subscriptions: Subscription[] = [];
  parent: ICommunity | ICommunityGroup | IHackathon;
  parentType: EDbModels;

  @Output() updateSelectedForum = new EventEmitter<ICommunityChannel>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: LibAuthwatchService,
    private communityChannelNotifications: CommunityChannelNotificationsChannel,
    private seoService: SeoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
  ) {}

  ngOnInit() {
    this.getParent();
    this.subscriptions.push(
      this.communityChannelManagerService.forumsByGroup$.subscribe((data) => {
        this.communityForums = data;
      }),

      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),
      this.communityChannelManagerService.communityRoles$.subscribe((data) => {
        this.communityRoles = data;
      }),
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelsRoles = data;
      }),
      this.communityChannelNotifications.notifications$.subscribe((data) => {
        this.channelNotifications = data.map((a) => a.id);
        this.markRead();
      }),
      this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
        this.selectedChannel = data;
        this.markRead();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  getParent() {
    this.communityChannelManagerService.parent$.subscribe((data) => {
      this.parent = data;
    });
    this.communityChannelManagerService.parentType$.subscribe((data) => {
      this.parentType = data;
    });
  }

  markRead() {
    if (this.selectedChannel && this.channelNotifications.includes(this.selectedChannel.id)) {
      this.communityChannelNotifications.markRead(this.selectedChannel.id);
    }
  }

  selectedCommunityForum(forumName) {
    this.selectedForumName = forumName.key;
    this.updateSelectedForum.emit(forumName.value);
    let urlSegments = [];
    switch (this.parentType) {
      case EDbModels.KOMMUNITY:
        urlSegments = ['communities', this.parent.slug, 'forums'];
        break;
      case EDbModels.COMMUNITY_GROUP:
        urlSegments = ['orgs', this.parent.slug, 'forums'];
        break;
      default:
        console.error('Invalid Parent Type:', this.parentType);
        break;
    }

    if (this.router.url.startsWith('/admin')) {
      urlSegments.unshift('admin');
    }

    this.router.navigate(urlSegments, {
      queryParams: { category: forumName ? forumName.key : 'general' },
    });
    this.communityChannelManagerService.setForum(forumName.value);
  }

  newForumDialogBox(groupName?) {
    this.dialogService.open(NewCommunityChannelComponent, {
      closeOnBackdropClick: false,
      hasScroll: true,
      context: {
        groupName: groupName,
        discussionType: this.discussionType.FORUM,
      },
    });
  }
}
