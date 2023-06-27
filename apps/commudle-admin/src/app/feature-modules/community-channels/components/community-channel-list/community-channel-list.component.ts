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
import { ChannelSettingsComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/channel-settings.component';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'app-community-channel-list',
  templateUrl: './community-channel-list.component.html',
  styleUrls: ['./community-channel-list.component.scss'],
})
export class CommunityChannelListComponent implements OnInit, OnDestroy {
  @Input() selectedCommunity: ICommunity;
  @Input() groupedChannels: EGroupedCommunityChannels;
  @Input() showCommunityBadge = false;
  selectedChannel: ICommunityChannel;
  selectedChannelId: number;
  currentUser: ICurrentUser;
  EUserRoles = EUserRoles;
  communityRoles = [];
  channelsRoles = {};
  channelNotifications = [];
  sidebarExpanded = false;

  subscriptions: Subscription[] = [];
  discussionType = EDiscussionType;

  @Output() updateSelectedChannel = new EventEmitter<ICommunityChannel>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: LibAuthwatchService,
    private communityChannelNotifications: CommunityChannelNotificationsChannel,
    private seoService: SeoService,
    private router: Router,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    if (this.activatedRoute.snapshot.params.community_channel_id) {
      this.selectedChannelId = this.activatedRoute.snapshot.params.community_channel_id;
    }
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
      // this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
      //   this.selectedChannel = data;
      //   if (this.selectedChannel) {
      //     // this.setMeta();
      //   }
      //   this.markRead();
      // }),
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

  selectedCommunityChannel(channel: ICommunityChannel) {
    this.selectedChannelId = channel.id;
    this.updateSelectedChannel.emit(channel);
    this.router.navigate(['communities', this.selectedCommunity.slug, 'channels', channel.id]);
  }

  newChannelDialogBox(groupName?) {
    this.dialogService.open(NewCommunityChannelComponent, {
      closeOnBackdropClick: false,
      hasBackdrop: false,
      context: {
        groupName: groupName,
        discussionType: this.discussionType.CHANNEL,
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
        discussionType: this.discussionType.CHANNEL,
      },
    });
  }
}
