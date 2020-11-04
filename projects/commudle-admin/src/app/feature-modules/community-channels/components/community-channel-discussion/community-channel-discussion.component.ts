import { Component, OnInit } from '@angular/core';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

@Component({
  selector: 'app-community-channel-discussion',
  templateUrl: './community-channel-discussion.component.html',
  styleUrls: ['./community-channel-discussion.component.scss']
})
export class CommunityChannelDiscussionComponent implements OnInit {
  subscriptions = [];
  selectedChannel: ICommunityChannel;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.selectedChannel$.subscribe(
        data => {
          this.selectedChannel = data;
        }
      )
    );
  }

}
