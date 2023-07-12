/* eslint-disable @nrwl/nx/enforce-module-boundaries */
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommunityChannelManagerService } from 'apps/commudle-admin/src/app/feature-modules/community-channels/services/community-channel-manager.service';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'apps/shared-models/community-channel.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { Subscription } from 'rxjs';
import { faUsers } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss'],
})
export class CommunityChannelComponent implements OnInit, OnDestroy, OnChanges {
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

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe((data) => {
        if (data && !this.initialized) {
          this.initialized = true;
        } else if (this.initialized && this.selectedChannel) {
          this.communityChannelManagerService.findChannel(this.selectedChannel.id),
            this.getDiscussion(this.selectedChannel.id);
        }
      }),
      this.communityChannelManagerService.selectedChannel$.subscribe((data) => {
        this.selectedChannel = data;
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
    const url = this.activatedRoute.snapshot.url.join('/');
    this.showMembersList = url.endsWith('/members');
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
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
      this.getDiscussion(this.selectedChannelId);
    } else {
      this.notFound = true;
    }
  }

  getDiscussion(channelId) {
    this.isLoading = true;
    this.subscriptions.push(
      this.discussionsService.pGetOrCreateForCommunityChannel(channelId).subscribe((data) => {
        this.discussion = data;
        this.isLoading = false;
        this.communityChannelManagerService.setCommunityListview(false);
      }),
    );
  }

  redirectToMembers() {
    const url = this.activatedRoute.snapshot.url.join('/');
    const currentUrl = this.router.url;
    if (url.endsWith('/members')) {
      this.closeChannelMembersList();
    } else {
      this.router.navigate([currentUrl, 'members']);
    }
  }
}
