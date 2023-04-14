import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { AuthGuard } from 'apps/shared-services/lib-authwatch.guard';
import { CommunityGroupFormComponent } from './components/community-group-form/community-group-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommunitiesComponent } from 'apps/commudle-admin/src/app/feature-modules/community-groups/components/communities/communities.component';
import { AdminTeamComponent } from 'apps/commudle-admin/src/app/feature-modules/community-groups/components/admin-team/admin-team.component';
import { MembersListComponent } from 'apps/commudle-admin/src/app/feature-modules/community-groups/components/members-list/members-list.component';

const routes = [
  {
    path: 'create',
    component: CommunityGroupFormComponent,
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
    },
  },
  {
    path: ':community_group_id',
    canActivate: [AuthGuard],
    component: DashboardComponent,
    data: {
      expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
    },
    children: [
      {
        path: 'community',
        component: CommunitiesComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
        },
      },
      {
        path: 'admin-team',
        component: AdminTeamComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
        },
      },
      {
        path: 'edit',
        component: CommunityGroupFormComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
        },
      },
      {
        path: 'members',
        component: MembersListComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
        },
      },

      // {
      //   path: ':community_group_id',
      //   component: DashboardComponent,
      // },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityGroupsRoutingModule {}
