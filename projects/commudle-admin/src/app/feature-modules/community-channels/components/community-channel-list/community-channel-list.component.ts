import { Component, OnDestroy, OnInit } from '@angular/core';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

interface EGroupedCommunityChannels {
  [groupName: string]: ICommunityChannel[];
}

@Component({
  selector: 'app-community-channel-list',
  templateUrl: './community-channel-list.component.html',
  styleUrls: ['./community-channel-list.component.scss']
})
export class CommunityChannelListComponent implements OnInit, OnDestroy {
  subscriptions = [];
  groupedChannels: EGroupedCommunityChannels;
  selectedChannel: ICommunityChannel;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.communityChannelManagerService.communityChannels$.subscribe(
      data => {
        this.groupedChannels = data;
        console.log(this.groupedChannels);
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
