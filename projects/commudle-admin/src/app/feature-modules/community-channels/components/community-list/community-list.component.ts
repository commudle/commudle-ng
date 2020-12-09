import { Component, Input, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { CommunityChannelsService } from '../../services/community-channels.service';

@Component({
  selector: 'app-community-list',
  templateUrl: './community-list.component.html',
  styleUrls: ['./community-list.component.scss']
})
export class CommunityListComponent implements OnInit {
  @Input() selectedCommunity: ICommunity;
  communities: ICommunity[];
  constructor(
    private communityChannelsService: CommunityChannelsService
  ) { }

  ngOnInit() {
    this.getUserChannelCommunities();
  }


  getUserChannelCommunities() {
    this.communityChannelsService.getUserChannelCommunities().subscribe(
      data => {
        this.communities = data.communities;
        if (this.communities.findIndex(k => k.slug === this.selectedCommunity.slug) == -1) {
          this.communities.unshift(this.selectedCommunity);
        }
      }
    );
  }

}
