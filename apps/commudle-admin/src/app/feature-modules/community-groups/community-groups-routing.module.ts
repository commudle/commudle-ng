import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { AuthGuard } from 'apps/shared-services/lib-authwatch.guard';
import { CommunityGroupFormComponent } from './components/community-group-form/community-group-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

const routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    data: {
      expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
    },
    children: [
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
        component: DashboardComponent,
      },
      {
        path: ':community_group_id/edit',
        component: CommunityGroupFormComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR],
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityGroupsRoutingModule {}
