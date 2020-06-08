import { Component, OnInit } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IUser } from 'projects/shared-models/user.model';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  community: ICommunity;

  EUserRoles = EUserRoles;

  organizers: IUser[] = [];
  eventOrganizers: IUser[] = [];


  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService
  ) { }

  ngOnInit() {
    this.activatedRoute.data.subscribe(data => {
      this.community = data.community;
    });

    this.getOrganizers(EUserRoles.ORGANIZER);
    this.getEventOrganizers(EUserRoles.EVENT_VOLUNTEER);
  }

  getOrganizers(roleName) {
    this.userRolesUsersService.pGetCommunityLeadersByRole(this.community.id, roleName).subscribe(
      data => {
        this.organizers = data.users;
      }
    );
  }

  getEventOrganizers(roleName) {
    this.userRolesUsersService.pGetCommunityLeadersByRole(this.community.id, roleName).subscribe(
      data => {
        this.eventOrganizers = data.users;
      }
    );
  }

}
