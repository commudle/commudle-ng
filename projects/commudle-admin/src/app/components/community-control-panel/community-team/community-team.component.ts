import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { UserRolesUsersService } from '../../../services/user_roles_users.service';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUserRolesUser, EUserRolesUserStatus } from 'projects/shared-models/user_roles_user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
@Component({
  selector: 'app-community-team',
  templateUrl: './community-team.component.html',
  styleUrls: ['./community-team.component.scss']
})
export class CommunityTeamComponent implements OnInit, OnChanges {
  @Input() community: ICommunity;
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
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
  }

  ngOnChanges() {

    if (this.community) {
      this.userRolesUsersService.getCommunityUsersByRole(
        this.community.id, EUserRoles.ORGANIZER).subscribe(
          data => this.organizers = data.user_roles_users
        );

      this.userRolesUsersService.getCommunityUsersByRole(
        this.community.id, EUserRoles.EVENT_ORGANIZER).subscribe(
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

    newUserRolesUser.parent_type = 'Community';
    newUserRolesUser.parent_id = this.community.id;
    this.userRolesUsersService.createUserRolesUser(this.community.id, newUserRolesUser).subscribe(
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
