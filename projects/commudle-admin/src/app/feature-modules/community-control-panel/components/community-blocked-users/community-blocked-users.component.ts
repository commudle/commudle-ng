import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';

@Component({
  selector: 'app-community-blocked-users',
  templateUrl: './community-blocked-users.component.html',
  styleUrls: ['./community-blocked-users.component.scss'],
})
export class CommunityBlockedUsersComponent implements OnInit {
  userRolesUsers: IUserRolesUser[];
  isLoading = false;

  constructor(private activatedRoute: ActivatedRoute, private userRolesUsersService: UserRolesUsersService) {}

  ngOnInit() {
    this.getMembers();
  }

  getMembers() {
    this.isLoading = true;
    this.userRolesUsersService
      .getCommunityBlockedUsers(this.activatedRoute.parent.snapshot.params.community_id)
      .subscribe((data) => {
        this.userRolesUsers = data.user_roles_users;
        this.isLoading = false;
      });
  }
}
