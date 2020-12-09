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
        }
      )
    );

    this.presetChannel();
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }


  presetChannel() {
    this.subscriptions.push(
      this.communityChannelManagerService.selectedChannel$.subscribe(
        data => this.selectedChannel = data
      )
    );
  }



}
