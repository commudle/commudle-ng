import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

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

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService,
    private activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe(
        data => {
          if (data && !this.initialized) {
            this.initialize();
            this.initialized = true;
          } else if (this.initialized && this.selectedChannel) {
            this.communityChannelManagerService.setChannel(this.communityChannelManagerService.findChannel(this.selectedChannel.id));
            this.getDiscussion();
          }
        }
      )
    );
  }

  ngOnDestroy(): void {
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


  initialize() {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe(
        data => {
          this.communityChannelManagerService.setChannel(this.communityChannelManagerService.findChannel(data.community_channel_id));
        }
      )
    );

    this.subscriptions.push(
      this.communityChannelManagerService.selectedChannel$.subscribe(
        data => {
          this.selectedChannel = data;
          if (this.selectedChannel) {
            this.getDiscussion();
          }
        }
      )
    );
  }

  getDiscussion() {
    this.discussionsService.pGetOrCreateForCommunityChannel(this.selectedChannel.id).subscribe(
      data => {
        this.discussion = data;
      }
    );
  }

}
