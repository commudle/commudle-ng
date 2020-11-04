import { UsersService } from './../../../../../../../shared-services/users.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ActivatedRoute } from '@angular/router';
import { CommunityChannelManagerService } from '../../services/community-channel-manager.service';

@Component({
  selector: 'app-community-channels-dashboard',
  templateUrl: './community-channels-dashboard.component.html',
  styleUrls: ['./community-channels-dashboard.component.scss']
})
export class CommunityChannelsDashboardComponent implements OnInit, OnDestroy {
  subscriptions = [];

  currentUser: ICurrentUser;
  selectedCommunity: ICommunity;

  constructor(
    private usersService: UsersService,
    private activatedRoute: ActivatedRoute,
    private communityChannelManagerService: CommunityChannelManagerService
  ) { }

  ngOnInit() {
    let subs = this.activatedRoute.params.subscribe(
      data => {
        if (!this.selectedCommunity || data.community_id !== this.selectedCommunity.slug) {
          this.selectedCommunity = this.activatedRoute.snapshot.data.community;
          this.communityChannelManagerService.setCommunity(this.selectedCommunity);
        }
      }
    );
    this.subscriptions.push(subs);
  }

  ngOnDestroy() {
    for (let subscription of this.subscriptions) {
      subscription.unsubscribe();
    }
  }

}
