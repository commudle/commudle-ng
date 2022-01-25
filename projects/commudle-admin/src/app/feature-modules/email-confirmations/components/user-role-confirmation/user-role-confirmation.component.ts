import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { ICommunity } from 'projects/shared-models/community.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { IEvent } from 'projects/shared-models/event.model';
import { IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-user-role-confirmation',
  templateUrl: './user-role-confirmation.component.html',
  styleUrls: ['./user-role-confirmation.component.scss'],
})
export class UserRoleConfirmationComponent implements OnInit, OnDestroy {
  userRolesUser: IUserRolesUser;
  community: ICommunity;
  event: IEvent;
  communityGroup: ICommunityGroup;
  EUserRoles = EUserRoles;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((data) => this.activateRole(data.token));

    this.seoService.setTitle('Confirm Role');
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  activateRole(token) {
    this.userRolesUsersService.confirmCommunityRole(token).subscribe((data) => {
      this.userRolesUser = data.user_roles_user;
      this.community = data.community;
      this.event = data.event;
      this.communityGroup = data.community_group;
    });
  }
}
