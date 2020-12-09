import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
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
  selectedCommunity: ICommunity;
  currentUser: ICurrentUser;

  constructor(
    private communityChannelManagerService: CommunityChannelManagerService,
    private authWatchService: LibAuthwatchService
  ) { }

  ngOnInit() {

    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
        }
      )
    )

    this.subscriptions.push(
      this.communityChannelManagerService.selectedCommunity$.subscribe(
        data => {
          this.selectedCommunity = data;
        }
      )
    )

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
