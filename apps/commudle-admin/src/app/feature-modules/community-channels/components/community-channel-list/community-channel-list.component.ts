import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { NewCommunityChannelComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/new-community-channel/new-community-channel.component';
import { ChannelSettingsComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/channel-settings/channel-settings.component';
import { EDiscussionType } from 'apps/commudle-admin/src/app/feature-modules/community-channels/model/discussion-type.enum';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { EDbModels } from '@commudle/shared-models';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'app-community-channel-list',
  templateUrl: './community-channel-list.component.html',
  styleUrls: ['./community-channel-list.component.scss'],
})
export class CommunityChannelListComponent implements OnInit, OnDestroy {
  @Input() groupedChannels: EGroupedCommunityChannels;
  @Input() isCommunityOrganizer = false;
  parent: ICommunity | ICommunityGroup;
  parentType: EDbModels;
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
  newCommunityChannelPopup;
  faCircleCheck = faCircleCheck;

  @Output() updateSelectedChannel = new EventEmitter<ICommunityChannel>();

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: LibAuthwatchService,
    private communityChannelNotifications: CommunityChannelNotificationsChannel,
    private router: Router,
    private dialogService: NbDialogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.getParent();
    if (this.activatedRoute.snapshot.params.community_channel_id) {
      this.selectedChannelId = Number(this.activatedRoute.snapshot.params.community_channel_id);
    }

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),

      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelsRoles = data;
      }),
      this.communityChannelNotifications.notifications$.subscribe((data) => {
        this.channelNotifications = data.map((a) => a.id);
        this.markRead();
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    if (this.newCommunityChannelPopup) {
      this.newCommunityChannelPopup.close();
    }
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

  selectedCommunityChannel(channel: ICommunityChannel) {
    this.selectedChannelId = channel.id;
    this.updateSelectedChannel.emit(channel);
    let currentUrl = this.router.url;

    // Replace the channel ID if found in the URL
    if (this.activatedRoute.snapshot.params.community_channel_id) {
      currentUrl = currentUrl.replace(/\/channels\/\d+/, `/channels/${channel.id}`);
    } else {
      currentUrl = currentUrl + '/' + channel.id;
    }

    // Navigate to the updated URL
    this.router.navigateByUrl(currentUrl);
  }

  newChannelDialogBox(groupName?) {
    this.newCommunityChannelPopup = this.dialogService.open(NewCommunityChannelComponent, {
      closeOnBackdropClick: false,
      hasScroll: false,
      context: {
        groupName: groupName,
        discussionType: this.discussionType.CHANNEL,
      },
    });
  }

  inviteDialogBox(channel: ICommunityChannel) {
    const dialogRef = this.dialogService.open(ChannelSettingsComponent, {
      closeOnBackdropClick: false,
      hasScroll: false,
      context: {
        channel: channel,
        invite: true,
        // currentUrl: 'communities/' + this.parent.slug + '/channels',
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }

  editDialogBox(channel: ICommunityChannel) {
    const dialogRef = this.dialogService.open(ChannelSettingsComponent, {
      closeOnBackdropClick: false,
      hasScroll: false,
      context: {
        channel: channel,
        discussionType: this.discussionType.CHANNEL,
        // currentUrl: 'communities/' + this.parent.slug + '/channels',
      },
    });
    dialogRef.componentRef.instance.updateForm.subscribe(() => {
      dialogRef.close();
    });
  }
}
