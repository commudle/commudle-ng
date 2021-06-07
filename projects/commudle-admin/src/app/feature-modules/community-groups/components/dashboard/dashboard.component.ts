import { NbWindowService } from '@nebular/theme';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICommunityGroup } from 'projects/shared-models/community-group.model';
import { CommunityGroupsService } from 'projects/commudle-admin/src/app/services/community-groups.service';
import { ICommunity } from 'projects/shared-models/community.model';
import { EUserRolesUserStatus, IUserRolesUser } from 'projects/shared-models/user_roles_user.model';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { FormBuilder, Validators } from '@angular/forms';
import { UserRolesUsersService } from 'projects/commudle-admin/src/app/services/user_roles_users.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  communityGroup: ICommunityGroup;
  communities: ICommunity[] = [];
  subscriptions = [];

  EUserRolesUserStatus = EUserRolesUserStatus;
  EUserRoles = EUserRoles;

  team: IUserRolesUser[] = [];

  userRolesUserForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    parent_type: ['CommunityGroup'],
    parent_id: ['', Validators.required],
    user_role_name: [EUserRoles.COMMUNITY_ADMIN]
  });

  constructor(
    private activatedRoute: ActivatedRoute,
    private communityGroupsService: CommunityGroupsService,
    private userRolesUsersService: UserRolesUsersService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit() {
    this.subscriptions.push(this.activatedRoute.params.subscribe(
      data => {
        this.communityGroupsService.show(data.community_group_id).subscribe(
          data => {
            this.communityGroup = data;
            this.setMeta();
            this.userRolesUserForm.patchValue({
              parent_id: this.communityGroup.slug
            });
            this.getCommunities();
            this.getTeam();
          }
        );
      }
    ));
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }
    this.meta.removeTag("name='robots'");

  }


  getCommunities() {
    this.communityGroupsService.communities(this.communityGroup.slug).subscribe(
      data => {
        this.communities = data.communities;
      }
    );
  }

  inviteCommunityAdmin() {
    this.userRolesUsersService.createUserRolesUser(this.userRolesUserForm.value).subscribe(
      data => {
        this.toastLogService.successDialog('Invited!');
        this.team.push(data);
        this.userRolesUserForm.reset();
      }
    );
  }

  getTeam() {
    this.userRolesUsersService.getCommunityGroupLeaders(this.communityGroup.slug).subscribe(
      data => {
        this.team = data.user_roles_users;
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

  remove(index) {
    this.userRolesUsersService.removeUserRolesUser(this.team[index].id).subscribe(
      (data) => {

        this.team.splice(index, 1);

        this.toastLogService.successDialog("Removed and informed by email!", 3000);
      }
    );
  }

  setMeta() {
    this.title.setTitle(`${this.communityGroup} | Dashboard`);
    this.meta.updateTag({
      name: 'robots',
      content: 'noindex'
    });
  }



}
