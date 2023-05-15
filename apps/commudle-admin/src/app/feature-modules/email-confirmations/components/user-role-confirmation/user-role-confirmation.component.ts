import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@commudle/theme';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { UserRolesUsersService } from 'apps/commudle-admin/src/app/services/user_roles_users.service';
import { ICommunityGroup } from 'apps/shared-models/community-group.model';
import { ICommunity } from 'apps/shared-models/community.model';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IUserRolesUser } from 'apps/shared-models/user_roles_user.model';
import { SeoService } from 'apps/shared-services/seo.service';

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
  acceptRole = false;
  token;
  role;
  parentName;
  communityName;
  eventName;

  constructor(
    private activatedRoute: ActivatedRoute,
    private userRolesUsersService: UserRolesUsersService,
    private seoService: SeoService,
    private nbDialogService: NbDialogService,
    private router: Router,
  ) {}
  ngOnInit() {
    // this.activatedRoute.queryParams.subscribe((data) => this.activateRole(data.token));
    this.activatedRoute.queryParams.subscribe((params) => {
      this.token = params.token;
      this.userRolesUsersService.verifyInvitationToken(this.token).subscribe((data) => {
        this.role = data.user_roles_user.user_role.name;
        this.parentName = data.user_roles_user.parent_name;
        this.communityName = data.community.name;
        this.eventName = data.event.name;
        this.onAcceptRoleButton();
      });
    });

    this.seoService.setTitle('Confirm Role');
    this.seoService.noIndex(true);
  }

  ngOnDestroy() {
    this.seoService.noIndex(false);
  }

  activateRole(token) {
    console.log('called');
    this.userRolesUsersService.confirmCommunityRole(token).subscribe((data) => {
      this.userRolesUser = data.user_roles_user;
      this.community = data.community;
      this.event = data.event;
      this.communityGroup = data.community_group;
    });
  }

  onAcceptRoleButton() {
    this.acceptRole = true;
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        component: this.role,
        parentName: this.parentName,
        acceptRole: this.acceptRole,
        volunteerCommunityName: this.communityName,
        volunteerEventName: this.eventName,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'rejected') {
        const queryParams = { decline: true };
        this.router.navigate([], { queryParams });
      }
      this.activateRole(this.token);
    });
  }
}
