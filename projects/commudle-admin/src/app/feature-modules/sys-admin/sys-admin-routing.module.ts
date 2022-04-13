import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminBadgesAssignComponent } from './components/admin-badges/admin-badges-assign/admin-badges-assign.component';
import { AdminBadgesFormComponent } from './components/admin-badges/admin-badges-form/admin-badges-form.component';
import { AdminBadgesListComponent } from './components/admin-badges/admin-badges-list/admin-badges-list.component';
import { AdminBadgesComponent } from './components/admin-badges/admin-badges.component';
import { AdminFeaturedCommunitiesComponent } from './components/admin-featured-communities/admin-featured-communities.component';
import { AdminPageAdsFormComponent } from './components/admin-page-ads/admin-page-ads-form/admin-page-ads-form.component';
import { AdminPageAdsListComponent } from './components/admin-page-ads/admin-page-ads-list/admin-page-ads-list.component';
import { AdminPageAdsComponent } from './components/admin-page-ads/admin-page-ads.component';
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
        path: 'pa',
        component: AdminPageAdsComponent,
        children: [
          {
            path: '',
            component: AdminPageAdsListComponent,
          },
          {
            path: 'form',
            component: AdminPageAdsFormComponent,
          },
        ],
      },
      {
        path: 'badges',
        component: AdminBadgesComponent,
        children: [
          {
            path: '',
            component: AdminBadgesListComponent,
          },
          {
            path: 'form',
            component: AdminBadgesFormComponent,
          },
          {
            path: 'assign',
            component: AdminBadgesAssignComponent,
          },
        ],
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
