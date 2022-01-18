import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-community-group-team',
  templateUrl: './community-group-team.component.html',
  styleUrls: ['./community-group-team.component.scss']
})
export class CommunityGroupTeamComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  team: IUserRolesUser[] = [];
  communityGroup: ICommunityGroup;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUserService: UserRolesUsersService,
    private seoService : SeoService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.parent.params.subscribe(
      data => {
        this.getTeam(data.community_group_id);
      }
    ));

    this.subscriptions.push(
      this.activatedRoute.parent.data.subscribe(
        data => {
          this.communityGroup = data.community_group;
          this.setMeta();
        }
      )
    )
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getTeam(communityGroupId) {
    this.userRolesUserService.pGetCommunityGroupLeaders(communityGroupId).subscribe(
      data => {
        this.team = data.user_roles_users;
      }
    );
  }

  setMeta() {
    this.seoService.setTags(
      `Team | ${this.communityGroup.name}`,
      `${this.communityGroup.mini_description}`,
      `${this.communityGroup.logo.i350}`
    );
  }


}
