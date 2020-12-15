import { UsersService } from './../../../../../../../shared-services/users.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';
import { NbWindowService } from '@nebular/theme';
import { ICommunityChannel } from 'projects/shared-models/community-channel.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-community-channels-dashboard',
  templateUrl: './community-channels-dashboard.component.html',
  styleUrls: ['./community-channels-dashboard.component.scss']
})
export class CommunityChannelsDashboardComponent implements OnInit, OnDestroy {
  subscriptions = [];

  currentUser: ICurrentUser;
  selectedCommunity: ICommunity;
  communityChannels;
  channelsQueried = false;
  showCommunityList = false;

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService,
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.communityChannelManagerService.setCurrentUser(data);
        }
      ),
      this.activatedRoute.params.subscribe(
        data => {
          if (!this.selectedCommunity || data.community_id !== this.selectedCommunity.slug) {
            this.selectedCommunity = this.activatedRoute.snapshot.data.community;;
            this.communityChannelManagerService.setCommunity(this.selectedCommunity);
          }
        }
      ),
      this.communityChannelManagerService.communityChannels$.subscribe(
        data => {
          this.communityChannels = data;
          if (data) {
            this.channelsQueried = true;
          }
        }
      ),
      this.communityChannelManagerService.showCommunityList$.subscribe(
        data => {
          this.showCommunityList = data;
        }
      )
    )
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
