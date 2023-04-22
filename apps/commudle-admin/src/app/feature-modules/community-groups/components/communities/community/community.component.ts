import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunity } from 'apps/shared-models/community.model';

@Component({
  selector: 'commudle-community',
  templateUrl: './community.component.html',
  styleUrls: ['./community.component.scss'],
})
export class CommunityComponent implements OnInit {
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];

  constructor(private communityGroupsService: CommunityGroupsService, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.parent.params.subscribe((data) => {
      this.communityGroupsService.show(data.community_group_id).subscribe((data) => {
        this.communityGroup = data;
        this.getCommunities();
      });
    });
  }

  getCommunities() {
    this.communityGroupsService.communities(this.communityGroup.slug).subscribe((data) => {
      this.communities = this.communities.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
    });
  }
}
