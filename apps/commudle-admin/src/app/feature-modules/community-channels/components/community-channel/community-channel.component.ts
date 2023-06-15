import { Component, Input, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { IUserMessage } from 'apps/shared-models/user_message.model';
import * as moment from 'moment';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { NbPopoverDirective } from '@commudle/theme';
import { CommunityChannelChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel.channel';

@Component({
  selector: 'app-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss'],
})
export class CommunityChannelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedChannelId: number;
  @Input() selectedChannel: ICommunityChannel;
  subscriptions = [];
  discussion: IDiscussion;
  initialized = false;
  notFound = false;
  displayCommunityList = false;
  hasNotifications = false;
  sidebarOpen = false;
  faThumbtack = faThumbtack;
  pinnedMessages: IUserMessage[];
  latestPinnedMessage: IUserMessage;
  moment = moment;
  isAdmin: boolean;
  @ViewChildren(NbPopoverDirective) popovers: QueryList<NbPopoverDirective>;
  channelRoles = {};
  permittedActions = [];
  allActions;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private communityChannelNotificationsChannel: CommunityChannelNotificationsChannel,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelChannel: CommunityChannelChannel,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        if (data && !this.initialized) {
          // this.initialize();
          this.initialized = true;
        } else if (this.initialized && this.selectedChannel) {
          this.communityChannelManagerService.setChannel(
            this.communityChannelManagerService.findChannel(this.selectedChannel.id),
          );
          this.getDiscussion(this.selectedChannel.id);
        }
      }),
      this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
        this.selectedChannel = data;
      }),
      this.communityChannelNotificationsChannel.hasNotifications$.subscribe((data) => {
        this.hasNotifications = data;
      }),
    );

    // this.getPinnedMessages();

    this.subscriptions.push(
      this.communityChannelManagerService.pinData$.subscribe((data) => {
        if (data) {
          switch (data.action) {
            case 'pin': {
              this.pinnedMessages.unshift(data.user_message);
              this.latestPinnedMessage = data.user_message;
              break;
            }
            case 'unpin': {
              const idx = this.pinnedMessages.findIndex((pinnedMessage) => pinnedMessage.id === data.user_message.id);
              if (idx !== -1) {
                if (idx === 0) {
                  this.latestPinnedMessage = null;
                }
                this.pinnedMessages.splice(idx, 1);
              }
              break;
            }
          }
        }
      }),
    );

    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelRoles = data;
      }),
    );

    this.checkAdmin();

    this.allActions = this.communityChannelChannel.ACTIONS;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.initialize();
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  checkAdmin() {
    this.subscriptions.push(
      this.communityChannelManagerService.userPermissions$.subscribe((permissions: string[]) => {
        if (permissions.length) {
          this.isAdmin = permissions.includes('unpin');
          this.permittedActions = permissions;
        }
      }),
    );
  }

  getPinnedMessages() {
    // this.channelsStore.selectedChannel$.subscribe((channels) => {
    this.subscriptions.push(
      this.communityChannelsService.getPinnedMessages(this.selectedChannelId).subscribe((response) => {
        this.pinnedMessages = response;
        this.pinnedMessages = this.pinnedMessages.filter((item) => item !== null);
        this.latestPinnedMessage = this.pinnedMessages[0];
      }),
    );
    // });
  }

  removePinnedMessage(message: IUserMessage) {
    this.subscriptions.push(
      this.communityChannelsService.unpinMessage(message.id, this.selectedChannelId).subscribe(() => {}),
    );
  }

  scrollToMessage(message: IUserMessage) {
    this.communityChannelManagerService.setScrollToMessage(message);
    this.popovers.forEach((popover) => {
      if (popover.context === 'pinnedMessagesPopover') {
        popover.hide();
      }
    });
  }

  closeChannelMembersList() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('members')) {
      this.router.navigate([currentUrl.substring(0, currentUrl.lastIndexOf('/'))]);
    }
  }

  initialize() {
    const selectedCh = this.communityChannelManagerService.findChannel(this.selectedChannelId);
    if (selectedCh) {
      this.notFound = false;
      this.communityChannelManagerService.setChannel(selectedCh);
      this.getDiscussion(selectedCh.id);
    } else {
      this.notFound = true;
    }
  }

  getDiscussion(channelId) {
    this.discussionsService.pGetOrCreateForCommunityChannel(channelId).subscribe((data) => {
      this.discussion = data;
      console.log(this.discussion);
      this.communityChannelManagerService.setCommunityListview(false);
    });
  }

  toggleCommunityListDisplay() {
    this.communityChannelManagerService.setCommunityListview(!this.displayCommunityList);
    this.displayCommunityList = !this.displayCommunityList;
  }
}
