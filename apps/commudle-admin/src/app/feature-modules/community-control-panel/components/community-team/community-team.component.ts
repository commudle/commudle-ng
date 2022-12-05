import { Component, OnChanges, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { EUserRolesUserStatus, IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-community-team',
  templateUrl: './community-team.component.html',
  styleUrls: ['./community-team.component.scss'],
})
export class CommunityTeamComponent implements OnInit, OnChanges {
  communityId;
  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  organizers: IUserRolesUser[] = [];
  eventOrganizers: IUserRolesUser[] = [];

  userRolesUserForm;

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute,
  ) {
    this.userRolesUserForm = this.fb.group({
      email: ['', Validators.required],
      user_role_name: [EUserRoles.ORGANIZER],
    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe(() => {
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
    this.userRolesUsersService
      .createUserRolesUser({
        ...this.userRolesUserForm.value,
        parent_type: 'Kommunity',
        parent_id: this.communityId,
      })
      .subscribe((data) => {
        this.organizers.push(data);

        this.userRolesUserForm.reset({ user_role_name: EUserRoles.ORGANIZER });
        this.toastLogService.successDialog('Invitation Sent!');
      });
  }
}
