import { NbWindowService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunity } from 'projects/shared-models/community.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  subscriptions = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private windowService: NbWindowService                                                                                                                                                                                                                                                                                                                               
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      data => {
        this.communityGroupsService.show(data.community_group_id).subscribe(
          data => {
            this.communityGroup = data;
            this.getCommunities();
          }
        );
      }
    ));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
  }


  getCommunities() {
    this.communityGroupsService.communities(this.communityGroup.slug).subscribe(
      data => {
        this.communities = data.communities;
      }
    );
  }

}
