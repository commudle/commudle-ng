import { Component, OnInit } from '@angular/core';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

@Component({
  selector: 'app-community-channel',
  templateUrl: './community-channel.component.html',
  styleUrls: ['./community-channel.component.scss']
})
export class CommunityChannelComponent implements OnInit {
  subscriptions = [];
  selectedChannel: ICommunityChannel;
  discussion: IDiscussion;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private discussionsService: DiscussionsService
  ) { }

  ngOnInit() {
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
