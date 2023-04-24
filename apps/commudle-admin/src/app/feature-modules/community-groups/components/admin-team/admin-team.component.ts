import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { EUserRolesUserStatus, IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-admin-team',
  templateUrl: './admin-team.component.html',
  styleUrls: ['./admin-team.component.scss'],
})
export class AdminTeamComponent implements OnInit, OnDestroy {
  team: IUserRolesUser[] = [];
  subscriptions: Subscription[] = [];
  EUserRolesUserStatus = EUserRolesUserStatus;
  userRolesUserForm;
  communityGroupSlug: string;
  isLoading = true;

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private activatedRoute: ActivatedRoute,
    private toastLogService: LibToastLogService,
    private fb: FormBuilder,
  ) {
    this.userRolesUserForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      parent_type: ['CommunityGroup'],
      parent_id: ['', Validators.required],
      user_role_name: [EUserRoles.COMMUNITY_ADMIN],
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.getTeam(data.community_group_id);
        this.communityGroupSlug = data.community_group_id;
      }),
    );
    this.userRolesUserForm.patchValue({
      parent_id: this.communityGroupSlug,
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getTeam(id) {
    this.subscriptions.push(
      this.userRolesUsersService.getCommunityGroupLeaders(id).subscribe((data) => {
        this.team = data.user_roles_users;
        this.isLoading = false;
      }),
    );
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

  inviteCommunityAdmin() {
    this.userRolesUsersService.createUserRolesUser(this.userRolesUserForm.value).subscribe((data) => {
      this.toastLogService.successDialog('Invited!');
      this.team.push(data);
      // this.userRolesUserForm.reset();
      this.userRolesUserForm.controls['email'].reset();
    });
  }
}
