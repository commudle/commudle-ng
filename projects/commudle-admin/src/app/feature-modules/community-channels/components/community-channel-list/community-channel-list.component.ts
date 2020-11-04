import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

@Component({
  selector: 'app-community-channel-list',
  templateUrl: './community-channel-list.component.html',
  styleUrls: ['./community-channel-list.component.scss']
})
export class CommunityChannelListComponent implements OnInit, OnDestroy {
  subscriptions = [];
  channels: ICommunityChannel[];
  selectedChannel: ICommunityChannel;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.communityChannelManagerService.selectedCommunity$.subscribe(
      data => {
        // get all the permitted channels for this user
      }
    ));
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  selectChannel(channel) {
    this.selectedChannel = channel;
    this.communityChannelManagerService.setChannel(channel);
  }


}
