/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { Subscription } from 'rxjs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { ICommunity } from '@commudle/shared-models';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { NbDialogService } from '@commudle/theme';

@Component({
  selector: 'app-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss'],
})
export class CommunityChannelComponent implements OnInit, OnDestroy, OnChanges {
  @Input() parent: ICommunity | ICommunityGroup;
  @Input() selectedChannelId: number;
  selectedChannel: ICommunityChannel;
  subscriptions: Subscription[] = [];
  discussion: IDiscussion;
  initialized = false;
  notFound = false;
  channelRoles = {};
  showMembersList = false;
  isLoading = true;

  faUsers = faUsers;
  timeout: any;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private nbDialogService: NbDialogService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.channelsByGroups$.subscribe((data) => {
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

  onLongPress(dialog) {
    console.log('Long press detected!');
    this.nbDialogService.open(dialog);
  }
}
