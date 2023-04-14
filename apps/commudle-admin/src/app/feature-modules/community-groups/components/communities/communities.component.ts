import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-communities',
  templateUrl: './communities.component.html',
  styleUrls: ['./communities.component.scss'],
})
export class CommunitiesComponent implements OnInit {
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  constructor(private communityGroupsService: CommunityGroupsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((data) => {
      this.getCommunities(data.community_group_id);
    });
  }

  getCommunities(id) {
    this.communityGroupsService.communities(id).subscribe((data) => {
      console.log(data);
      // this.communities = this.communities.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
      // this.communities = data.page;
      console.log(this.communities);
    });
  }
}
