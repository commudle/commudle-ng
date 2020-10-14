import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { UserRolesUsersService } from '../../../services/user_roles_users.service';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUserRolesUser, EUserRolesUserStatus } from 'projects/shared-models/user_roles_user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-community-team',
  templateUrl: './community-team.component.html',
  styleUrls: ['./community-team.component.scss']
})
export class CommunityTeamComponent implements OnInit, OnChanges {
  communityId;
  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  organizers: IUserRolesUser[] = [];
  eventOrganizers: IUserRolesUser[] = [];


  userRolesUserForm = this.fb.group({
    email: ['', Validators.required],
    user_role_name: ['', Validators.required]
  });

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.communityId = this.activatedRoute.parent.snapshot.params['name'];
      this.getRoles();
    });
  }

  ngOnChanges() {
  }

  getRoles() {
    if (this.communityId) {
      this.userRolesUsersService.getCommunityUsersByRole(
        this.communityId, EUserRoles.ORGANIZER).subscribe(
          data => this.organizers = data.user_roles_users
        );

      this.userRolesUsersService.getCommunityUsersByRole(
        this.communityId, EUserRoles.EVENT_ORGANIZER).subscribe(
          data => this.eventOrganizers = data.user_roles_users
        );
    }

  }


  resendInvitationMail(userRolesUser) {
    this.userRolesUsersService.resendInvitation(userRolesUser.id).subscribe(
      (data) => {
        this.toastLogService.successDialog("Invite sent again!");
      }
    );
  }

  remove(userRolesUser, arrayType, index) {
    this.userRolesUsersService.removeUserRolesUser(userRolesUser.id).subscribe(
      (data) => {

        this[arrayType].splice(index, 1);

        this.toastLogService.successDialog("Removed and informed by email!", 3000);
      }
    );
  }


  createUserRolesUser() {
    let newUserRolesUser = this.userRolesUserForm.value;

    newUserRolesUser.parent_type = 'Kommunity';
    newUserRolesUser.parent_id = this.communityId;
    this.userRolesUsersService.createUserRolesUser(newUserRolesUser).subscribe(
      data => {
        switch (data.user_role.name) {
          case EUserRoles.ORGANIZER: {
            this.organizers.push(data);
            break;
          }
          case EUserRoles.EVENT_ORGANIZER: {
            this.eventOrganizers.push(data);
            break;
          }
          default:
            console.log('no valid role found');
        }
        this.userRolesUserForm.reset();
        this.toastLogService.successDialog("Invitation Sent!");
      }
    );
  }


}
