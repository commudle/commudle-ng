/* eslint-disable @nrwl/nx/enforce-module-boundaries */
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

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'app-community-forum-list',
  templateUrl: './community-forum-list.component.html',
  styleUrls: ['./community-forum-list.component.scss'],
})
export class CommunityForumListComponent implements OnInit, OnDestroy {
  @Input() showCommunityBadge = false;
  @Input() isCommunityOrganizer = false;
  @Input() selectedForumName: string;

  selectedCommunity: ICommunity;
  communityForums: EGroupedCommunityChannels;
  selectedChannel: ICommunityChannel;
  currentUser: ICurrentUser;
  EUserRoles = EUserRoles;
  communityRoles = [];
  channelsRoles = {};
  channelNotifications = [];
  discussionType = EDiscussionType;

  subscriptions: Subscription[] = [];

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
    this.subscriptions.push(
      this.communityChannelManagerService.communityForums$.subscribe((data) => {
        this.communityForums = data;
      }),

      this.activatedRoute.parent.data.subscribe((data) => {
        this.selectedCommunity = data.community;
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
        if (this.selectedChannel) {
          // this.setMeta();
        }
        this.markRead();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  setMeta() {
    this.seoService.setTags(
      `${this.selectedChannel.name} - ${this.selectedCommunity.name}`,
      `${this.selectedChannel.description.replace(/<[^>]*>/g, '').substring(0, 160)}`,
      this.selectedCommunity.logo_path,
    );
  }

  markRead() {
    if (this.selectedChannel && this.channelNotifications.includes(this.selectedChannel.id)) {
      this.communityChannelNotifications.markRead(this.selectedChannel.id);
    }
  }

  selectedCommunityForum(forumName) {
    this.selectedForumName = forumName.key;
    this.updateSelectedForum.emit(forumName.value);
    this.router.navigate(['communities', this.selectedCommunity.slug, 'forums'], {
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
        parentName: this.selectedCommunity.name,
      },
    });
  }
}
