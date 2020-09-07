import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { Validators, FormBuilder } from '@angular/forms';
import { IUserRolesUser, EUserRolesUserStatus } from 'projects/shared-models/user_roles_user.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss']
})
export class VolunteersComponent implements OnInit {
  @Input() event: IEvent;

  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  volunteers: IUserRolesUser[] = [];


  userRolesUserForm = this.fb.group({
    email: ['', Validators.required],
    user_role_name: [EUserRoles.EVENT_VOLUNTEER, Validators.required],
    parent_type: ['Event', Validators.required],
    parent_id: ['', Validators.required]
  });

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.getVolunteers();
    this.userRolesUserForm.patchValue({
      parent_id: this.event.id
    });
  }


  getVolunteers() {
    this.userRolesUsersService.getEventVolunteers(
      this.event.slug).subscribe(
        data => {
          this.volunteers = data.user_roles_users;
        }
      );
  }

  resendInvitationMail(userRolesUser) {
    this.userRolesUsersService.resendInvitation(userRolesUser.id).subscribe(
      (data) => {
        this.toastLogService.successDialog("Invite sent again!");
      }
    );
  }

  remove(userRolesUser, index) {
    this.userRolesUsersService.removeUserRolesUser(userRolesUser.id).subscribe(
      (data) => {

        this.volunteers.splice(index, 1);

        this.toastLogService.successDialog("Removed!", 3000);
      }
    );
  }


  createUserRolesUser() {
    this.userRolesUsersService.createUserRolesUser(this.userRolesUserForm.value).subscribe(
      data => {
        this.volunteers.push(data);
        this.userRolesUserForm.patchValue({
          email: null
        });
        this.toastLogService.successDialog('Invitation Email Sent!');
      }
    );
  }

}
