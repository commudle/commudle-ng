import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AdminBadgesAssignComponent } from './components/admin-badges/admin-badges-assign/admin-badges-assign.component';
import { AdminBadgesFormComponent } from './components/admin-badges/admin-badges-form/admin-badges-form.component';
import { AdminBadgesListComponent } from './components/admin-badges/admin-badges-list/admin-badges-list.component';
import { AdminBadgesComponent } from './components/admin-badges/admin-badges.component';
import { AdminFeaturedCommunitiesComponent } from './components/admin-featured/admin-featured-communities/admin-featured-communities.component';
import { AdminPageAdsFormComponent } from './components/admin-page-ads/admin-page-ads-form/admin-page-ads-form.component';
import { AdminPageAdsListComponent } from './components/admin-page-ads/admin-page-ads-list/admin-page-ads-list.component';
import { AdminPageAdsComponent } from './components/admin-page-ads/admin-page-ads.component';
import { AdminStaticAssetsListComponent } from './components/admin-static-assets/admin-static-assets-list/admin-static-assets-list.component';
import { AdminStaticAssetsComponent } from './components/admin-static-assets/admin-static-assets.component';
import { AdminStaticAssetFormComponent } from './components/admin-static-assets/admin-static-asset-form/admin-static-asset-form.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';
import { LabsComponent } from './components/labs/labs.component';
import { SysAdminComponent } from './sys-admin.component';
import { AdminFeaturedComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/admin-featured.component';
import { FeaturedCommunityBuildsComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/featured-community-builds/featured-community-builds.component';
import { AdminFeaturedLabsComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/admin-featured-labs/admin-featured-labs.component';
import { AdminFeaturedEventsComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/admin-featured-events/admin-featured-events.component';
import { AdminFeaturedUsersComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/admin-featured-users/admin-featured-users.component';
import { AdminFeaturedCommunitiesChannelsComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/admin-featured/admin-featured-communities-channels/admin-featured-communities-channels.component';
import { PaymentLogsComponent } from 'apps/commudle-admin/src/app/feature-modules/sys-admin/components/payment-logs/payment-logs.component';
import { PaymentDetailComponent } from 'apps/shared-components/payment-detail/payment-detail.component';

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
        path: 'static-assets',
        component: AdminStaticAssetsComponent,
        children: [
          {
            path: '',
            component: AdminStaticAssetsListComponent,
          },
          {
            path: 'new',
            component: AdminStaticAssetFormComponent,
          },
        ],
      },
      {
        path: 'admin-surveys',
        component: AdminSurveysComponent,
      },
      {
        path: 'payment-logs',
        children: [
          {
            path: '',
            component: PaymentLogsComponent,
          },
          {
            path: ':edfeg_id',
            component: PaymentDetailComponent,
          },
        ],
      },
      {
        path: 'featured',
        component: AdminFeaturedComponent,
        children: [
          {
            path: 'communities',
            component: AdminFeaturedCommunitiesComponent,
          },
          {
            path: 'builds',
            component: FeaturedCommunityBuildsComponent,
          },
          {
            path: 'labs',
            component: AdminFeaturedLabsComponent,
          },
          {
            path: 'events',
            component: AdminFeaturedEventsComponent,
          },
          {
            path: 'featured-users',
            component: AdminFeaturedUsersComponent,
          },
          // {
          //   path: 'featured-channels',
          //   component: AdminFeaturedCommunitiesChannelsComponent,
          // },
        ],
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
