import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private communityChannelManagerService: CommunityChannelManagerService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.communityChannelManagerService.communityChannels$.subscribe(
        data => {
          this.groupedChannels = data;
          if (this.groupedChannels) {
            this.presetChannel();
          }
        }
      )
    );
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  // get the channel id from route, find it from the groupedChannels and set it as selected channel
  presetChannel() {
    if (this.activatedRoute.firstChild) {
      this.subscriptions.push(
        this.activatedRoute.firstChild.params.subscribe(
          data => {
            if (data.community_channel_id) {
              Object.entries(this.groupedChannels).forEach(
                ([key, values]) => {
                  let ch = values.find(k => k.id == data.community_channel_id);
                  if (ch) {
                    this.selectChannel(ch);
                    return true;
                  }
                }
              );
            }
          }
        )
      )
    }
  }

  selectChannel(channel) {
    console.log('called');
    this.selectedChannel = channel;
    this.communityChannelManagerService.setChannel(channel);
  }


}
