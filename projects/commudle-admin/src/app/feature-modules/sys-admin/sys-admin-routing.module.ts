import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminFeaturedCommunitiesComponent } from './components/admin-featured-communities/admin-featured-communities.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';
import { LabsComponent } from './components/labs/labs.component';
import { SysAdminComponent } from './sys-admin.component';

const routes = [
  {
    path: '',
    component: SysAdminComponent,
    children: [
      {
        path: '',
        component: CommunityControlsComponent,
      },
      {
        path: 'admin-surveys',
        component: AdminSurveysComponent,
      },
      {
        path: 'featured-communities',
        component: AdminFeaturedCommunitiesComponent,
      },
      {
        path: 'community-builds',
        component: CommunityBuildsComponent,
      },
      {
        path: 'labs',
        component: LabsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SysAdminRoutingModule {}
