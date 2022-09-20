import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CommunityGroupsService } from 'apps/commudle-admin/src/app/services/community-groups.service';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunityGroup } from '@commudle/shared-models';
import { ICommunity } from '@commudle/shared-models';
import { EUserRoles } from '@commudle/shared-models';
import { EUserRolesUserStatus, IUserRolesUser } from '@commudle/shared-models';
import { LibToastLogService } from '@commudle/shared-services';
import { SeoService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  subscriptions = [];

  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  team: IUserRolesUser[] = [];

  userRolesUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    parent_type: ['CommunityGroup'],
    parent_id: ['', Validators.required],
    user_role_name: [EUserRoles.COMMUNITY_ADMIN],
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.seoService.noIndex(true);

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        this.communityGroupsService.show(data.community_group_id).subscribe((data) => {
          this.communityGroup = data;

          this.seoService.setTitle(`Dashboard | ${this.communityGroup.name}`);

          this.userRolesUserForm.patchValue({
            parent_id: this.communityGroup.slug,
          });
          this.getCommunities();
          this.getTeam();
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
    this.seoService.noIndex(false);
  }

  getCommunities() {
    this.communityGroupsService.communities(this.communityGroup.slug).subscribe((data) => {
      this.communities = data.communities;
    });
  }

  inviteCommunityAdmin() {
    this.userRolesUsersService.createUserRolesUser(this.userRolesUserForm.value).subscribe((data) => {
      this.toastLogService.successDialog('Invited!');
      this.team.push(data);
      this.userRolesUserForm.reset();
    });
  }

  getTeam() {
    this.userRolesUsersService.getCommunityGroupLeaders(this.communityGroup.slug).subscribe((data) => {
      this.team = data.user_roles_users;
    });
  }

  resendInvitationMail(userRolesUser) {
    this.userRolesUsersService.resendInvitation(userRolesUser.id).subscribe((data) => {
      this.toastLogService.successDialog('Invite sent again!');
    });
  }

  remove(index) {
    this.userRolesUsersService.removeUserRolesUser(this.team[index].id).subscribe((data) => {
      this.team.splice(index, 1);

      this.toastLogService.successDialog('Removed and informed by email!', 3000);
    });
  }
}
