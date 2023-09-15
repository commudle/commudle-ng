/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { Subscription } from 'rxjs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { ICommunity } from '@commudle/shared-models';
import { SeoService } from '@commudle/shared-services';

@Component({
  selector: 'app-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss'],
})
export class CommunityChannelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() selectedChannelId: number;
  @Input() selectedCommunity: ICommunity;
  selectedChannel: ICommunityChannel;
  subscriptions: Subscription[] = [];
  discussion: IDiscussion;
  initialized = false;
  notFound = false;
  channelRoles = {};
  showMembersList = false;
  isLoading = true;

  faUsers = faUsers;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        if (data && !this.initialized) {
          this.initialized = true;
        } else if (this.initialized && this.selectedChannel) {
          this.communityChannelManagerService.findChannel(this.selectedChannel.id), this.getDiscussion();
        }
      }),
    );

    this.subscriptions.push(
      this.communityChannelManagerService.allChannelRoles$.subscribe((data) => {
        this.channelRoles = data;
      }),
    );
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.initialize();
    this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
      this.selectedChannel = data;
      if (data) {
        this.setMeta();
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  initialize() {
    const selectedCh = this.communityChannelManagerService.findChannel(this.selectedChannelId);
    if (selectedCh) {
      this.notFound = false;
      this.communityChannelManagerService.setChannel(selectedCh);
      this.getDiscussion();
    } else {
      this.notFound = true;
    }
  }

  getDiscussion() {
    this.isLoading = true;
    this.subscriptions.push(
      this.discussionsService.pGetOrCreateForCommunityChannel(this.selectedChannelId).subscribe((data) => {
        this.discussion = data;
        this.isLoading = false;
        this.communityChannelManagerService.setCommunityListview(false);
      }),
    );
  }

  toggleMembersList() {
    this.showMembersList = !this.showMembersList;
  }

  setMeta() {
    this.seoService.setTags(
      `${this.selectedChannel.name} - ${this.selectedCommunity.name}`,
      `Interact with members in channels for ${this.selectedCommunity.name}! Share knowledge, network & grow together!`,
      this.selectedCommunity.logo_path,
    );
  }
}
