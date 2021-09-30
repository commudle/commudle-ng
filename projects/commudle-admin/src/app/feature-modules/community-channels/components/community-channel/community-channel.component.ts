import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelManagerService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/websockets/community-channel-notifications.channel';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { faThumbtack } from '@fortawesome/free-solid-svg-icons';
import { IUserMessage } from 'projects/shared-models/user_message.model';
import * as moment from 'moment';
import { Match } from 'autolinker';
import { CommunityChannelsService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/community-channels.service';
import { UpdatePinnedMessagesService } from 'projects/commudle-admin/src/app/feature-modules/community-channels/services/update-pinned-messages.service';

@Component({
  selector: 'app-community-channel',
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
  moment = moment;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private activatedRoute: ActivatedRoute,
    private communityChannelNotificationsChannel: CommunityChannelNotificationsChannel,
    private communityChannelsService: CommunityChannelsService,
    private updatePinnedMessagesService: UpdatePinnedMessagesService,
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
    this.getPinnedMessages();

    this.subscriptions.push(
      this.updatePinnedMessagesService.updatePinnedMessages$.subscribe((value) => {
        if (value) {
          this.getPinnedMessages();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }

  getPinnedMessages() {
    let channelId = this.activatedRoute.snapshot.params.community_channel_id;
    this.subscriptions.push(
      this.communityChannelsService.getPinnedMessages(channelId).subscribe((response) => {
        this.pinnedMessages = response;
        console.log(this.pinnedMessages);
      }),
    );
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

  highlightUserMentions(match: Match): string {
    switch (match.getType()) {
      case 'mention':
        return `<a href="https://commudle.com/users/${match
          .getMatchedText()
          .slice(1)}" target="_blank">${match.getMatchedText()}</a>`;
    }
  }
}
