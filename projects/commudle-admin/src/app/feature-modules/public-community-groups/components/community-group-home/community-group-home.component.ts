import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';

@Component({
  selector: 'app-community-group-home',
  templateUrl: './community-group-home.component.html',
  styleUrls: ['./community-group-home.component.scss']
})
export class CommunityGroupHomeComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  private subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      data => {
        this.getCommunityGroup(data.community_group_id);
      }
    ));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getCommunityGroup(communityGroupId) {
    this.communityGroupsService.pShow(communityGroupId).subscribe(
      data => {
        this.communityGroup = data;
      }
    );
  }

}
