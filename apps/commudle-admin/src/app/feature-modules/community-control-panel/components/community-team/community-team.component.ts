import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { EUserRoles } from '@commudle/shared-models';
import { IUserRolesUser, EUserRolesUserStatus } from '@commudle/shared-models';
import { FormBuilder, Validators } from '@angular/forms';
import { LibToastLogService } from '@commudle/shared-services';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
@Component({
  selector: 'commudle-community-team',
  templateUrl: './community-team.component.html',
  styleUrls: ['./community-team.component.scss'],
})
export class CommunityTeamComponent implements OnInit, OnChanges {
  communityId;
  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  organizers: IUserRolesUser[] = [];
  eventOrganizers: IUserRolesUser[] = [];

  userRolesUserForm = this.fb.group({
    email: ['', Validators.required],
    user_role_name: [EUserRoles.ORGANIZER],
  });

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.communityId = this.activatedRoute.parent.snapshot.params['community_id'];
      this.getRoles();
    });
  }

  ngOnChanges() {}

  getRoles() {
    if (this.communityId) {
      this.userRolesUsersService
        .getCommunityUsersByRole(this.communityId, EUserRoles.ORGANIZER)
        .subscribe((data) => (this.organizers = data.user_roles_users));

      this.userRolesUsersService
        .getCommunityUsersByRole(this.communityId, EUserRoles.EVENT_ORGANIZER)
        .subscribe((data) => (this.eventOrganizers = data.user_roles_users));
    }
  }

  resendInvitationMail(userRolesUser) {
    this.userRolesUsersService.resendInvitation(userRolesUser.id).subscribe((data) => {
      this.toastLogService.successDialog('Invite sent again!');
    });
  }

  remove(userRolesUser, arrayType, index) {
    this.userRolesUsersService.removeUserRolesUser(userRolesUser.id).subscribe((data) => {
      this[arrayType].splice(index, 1);

      this.toastLogService.successDialog('Removed and informed by email!', 3000);
    });
  }

  createUserRolesUser() {
    let newUserRolesUser = this.userRolesUserForm.value;

    newUserRolesUser.parent_type = 'Kommunity';
    newUserRolesUser.parent_id = this.communityId;
    // let role = data.user_role.name;
    this.userRolesUsersService.createUserRolesUser(newUserRolesUser).subscribe((data) => {
      this.organizers.push(data);

      this.userRolesUserForm.reset({ user_role_name: EUserRoles.ORGANIZER });
      this.toastLogService.successDialog('Invitation Sent!');
    });
  }
}
