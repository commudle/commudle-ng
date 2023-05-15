import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { EUserRolesUserStatus, IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { debounceTime, map, Observable, switchMap } from 'rxjs';
@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VolunteersComponent implements OnInit {
  @Input() event: IEvent;
  inputValue: string;

  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  volunteers: IUserRolesUser[] = [];

  userRolesUserForm;
  roleDesignations: Observable<string[]>;

  constructor(
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {
    this.userRolesUserForm = this.fb.group({
      email: ['', Validators.required],
      user_role_name: [EUserRoles.EVENT_VOLUNTEER, Validators.required],
      parent_type: ['Event', Validators.required],
      parent_id: [0, Validators.required],
      role_designation: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.roleDesignations = this.userRolesUserForm.get('role_designation').valueChanges.pipe(
      debounceTime(500),
      switchMap((values: string) =>
        this.userRolesUsersService.autocompleteRoleDesignation(values, this.event.kommunity_id),
      ),
      map((value: any) => value.role_designations),
    );

    this.getVolunteers();
    this.userRolesUserForm.patchValue({
      parent_id: this.event.id,
    });
  }

  getVolunteers() {
    this.userRolesUsersService.getEventVolunteers(this.event.slug).subscribe((data) => {
      this.volunteers = data.user_roles_users;
      this.changeDetectorRef.markForCheck();
    });
  }

  onSelectionChange(value): void {
    this.userRolesUserForm.get('role_designation').setValue(value);
  }

  resendInvitationMail(userRolesUser) {
    this.userRolesUsersService.resendInvitation(userRolesUser.id).subscribe((data) => {
      this.toastLogService.successDialog('Invite sent again!');
      this.changeDetectorRef.markForCheck();
    });
  }

  remove(userRolesUser, index) {
    this.userRolesUsersService.removeUserRolesUser(userRolesUser.id).subscribe((data) => {
      this.volunteers.splice(index, 1);

      this.toastLogService.successDialog('Removed!', 3000);
      this.changeDetectorRef.markForCheck();
    });
  }

  createUserRolesUser() {
    this.userRolesUsersService.createUserRolesUser(this.userRolesUserForm.value).subscribe((data) => {
      this.volunteers.push(data);
      this.userRolesUserForm.patchValue({
        email: null,
      });
      this.toastLogService.successDialog('Invitation Email Sent!');
      this.userRolesUserForm.reset();
      this.changeDetectorRef.markForCheck();
    });
  }
}
