import { Component, OnInit } from '@angular/core';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ActivatedRoute } from '@angular/router';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';

@Component({
  selector: 'app-user-role-confirmation',
  templateUrl: './user-role-confirmation.component.html',
  styleUrls: ['./user-role-confirmation.component.scss']
})
export class UserRoleConfirmationComponent implements OnInit {
  userRolesUser: IUserRolesUser;
  community: ICommunity;
  event: IEvent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(
      data => {
        this.activateRole(data.token);
      }
    );
  }

  activateRole(token) {
    this.userRolesUsersService.confirmCommunityRole(token).subscribe(
      data => {
        this.userRolesUser = data.user_roles_user;
        this.community = data.community;
        this.event = data.event;
      }
    );
  }

}
