import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { CommunityChannelNotificationsChannel } from '../../services/websockets/community-channel-notifications.channel';

@Component({
  selector: 'app-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss']
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

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private activatedRoute: ActivatedRoute,
    private communityChannelNotificationsChannel: CommunityChannelNotificationsChannel,
    private footerService: FooterService
  ) {}

  ngOnInit() {
    this.footerService.changeFooterStatus(false);
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
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
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
