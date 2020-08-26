import { Component, OnInit, OnDestroy } from '@angular/core';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';

@Component({
  selector: 'app-community-group-team',
  templateUrl: './community-group-team.component.html',
  styleUrls: ['./community-group-team.component.scss']
})
export class CommunityGroupTeamComponent implements OnInit, OnDestroy {
  private subscriptions = [];
  team: IUserRolesUser[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUserService: UserRolesUsersService
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.parent.params.subscribe(
      data => {
        this.getTeam(data.community_group_id);
      }
    ));
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


}
