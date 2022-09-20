import { Component, OnDestroy, OnInit, QueryList, ViewChildren } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from '@commudle/shared-models';
import { IDiscussion } from '@commudle/shared-models';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { IUserMessage } from '@commudle/shared-models';
import * as moment from 'moment';
import { Match } from 'autolinker';
import { CommunityChannelsService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { NbPopoverDirective } from '@nebular/theme';
import { CommunityChannelChannel } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel.channel';

@Component({
  selector: 'commudle-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss'],
})
export class CommunityChannelComponent implements OnInit, OnDestroy {
  subscriptions = [];
  selectedChannel: ICommunityChannel;
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
    private activatedRoute: ActivatedRoute,
    private communityChannelNotificationsChannel: CommunityChannelNotificationsChannel,
    private communityChannelsService: CommunityChannelsService,
    private communityChannelChannel: CommunityChannelChannel,
    private router: Router,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        if (data && !this.initialized) {
          this.initialize();
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

    this.subscriptions.push(
      this.activatedRoute.params.subscribe(() => {
        this.getPinnedMessages();
      }),
    );

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
    let channelId = this.activatedRoute.snapshot.params.community_channel_id;
    this.subscriptions.push(
      this.communityChannelsService.getPinnedMessages(channelId).subscribe((response) => {
        this.pinnedMessages = response;
        this.pinnedMessages = this.pinnedMessages.filter((item) => item !== null);
        this.latestPinnedMessage = this.pinnedMessages[0];
      }),
    );
  }

  removePinnedMessage(message: IUserMessage) {
    let channelId = this.activatedRoute.snapshot.params.community_channel_id;
    this.subscriptions.push(this.communityChannelsService.unpinMessage(message.id, channelId).subscribe(() => {}));
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
    let currentUrl = this.router.url;
    if (currentUrl.includes('members')) {
      this.router.navigate([currentUrl.substring(0, currentUrl.lastIndexOf('/'))]);
    }
  }

  initialize() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        const selectedCh = this.communityChannelManagerService.findChannel(data.community_channel_id);
        if (selectedCh) {
          this.notFound = false;
          this.communityChannelManagerService.setChannel(selectedCh);
          this.getDiscussion(selectedCh.id);
        } else {
          this.notFound = true;
        }
      }),
    );
  }

  getDiscussion(channelId) {
    this.discussionsService.pGetOrCreateForCommunityChannel(channelId).subscribe((data) => {
      this.discussion = data;
      this.communityChannelManagerService.setCommunityListview(false);
    });
  }

  toggleCommunityListDisplay() {
    this.communityChannelManagerService.setCommunityListview(!this.displayCommunityList);
    this.displayCommunityList = !this.displayCommunityList;
  }
}
