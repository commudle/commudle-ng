import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-community-group-communities',
  templateUrl: './community-group-communities.component.html',
  styleUrls: ['./community-group-communities.component.scss']
})
export class CommunityGroupCommunitiesComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  communities: ICommunity[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      data => {
        this.getCommunities(data.community_group_id);
      }
    ));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getCommunities(communityGroupId) {
    this.communityGroupsService.pCommunities(communityGroupId).subscribe(
      data => {
        this.communities = data.communities;
      }
    );
  }

}
