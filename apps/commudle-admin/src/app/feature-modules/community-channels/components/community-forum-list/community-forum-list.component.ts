import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
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
import { ChannelSettingsComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/channel-settings.component';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';

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
    private communityChannelsService: CommunityChannelsService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.communityForums$.subscribe((data) => {
        this.communityForums = data;
        // if (data) {
        //   this.channelsQueried = true;
        //   if (this.activatedRoute.snapshot.params.community_channel_id) {
        //     this.selectedChannelId = this.activatedRoute.snapshot.params.community_channel_id;
        //     this.showChannelsComponent = true;
        //   }
        // }
      }),
    );
    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe((data) => {
        this.selectedCommunity = data.community;
        // this.getChannels();
        // this.communityChannelManagerService.setCommunityListview(false);
      }),
    );
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),
      // this.communityChannelManagerService.selectedCommunity$.subscribe((data) => {
      //   this.selectedCommunity = data;
      // }),
      // this.communityChannelManagerService.communityChannels$.subscribe((data) => {
      //   this.groupedChannels = data;
      // }),
      // TODO lets remove it
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
    this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: { 'discussion-type': 'forum', 'forum-name': forumName ? forumName.key : 'general' },
      queryParamsHandling: 'merge', // remove to replace all query params by provided
    });
    this.communityChannelManagerService.setForum(forumName.value);
  }

  newForumDialogBox(groupName?) {
    this.dialogService.open(NewCommunityChannelComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      context: {
        groupName: groupName,
        discussionType: this.discussionType.FORUM,
      },
    });
  }

  inviteDialogBox(channelId) {
    this.dialogService.open(ChannelSettingsComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      context: {
        channelId: channelId,
        invite: true,
      },
    });
  }

  editDialogBox(channelId) {
    this.dialogService.open(ChannelSettingsComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      context: {
        channelId: channelId,
      },
    });
  }
}
