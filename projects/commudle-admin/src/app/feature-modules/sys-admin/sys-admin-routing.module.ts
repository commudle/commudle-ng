import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageAdsFormComponent } from './components/admin-page-ads/admin-page-ads-form/admin-page-ads-form.component';
import { AdminPageAdsListComponent } from './components/admin-page-ads/admin-page-ads-list/admin-page-ads-list.component';
import { AdminPageAdsComponent } from './components/admin-page-ads/admin-page-ads.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';
import { LabsComponent } from './components/labs/labs.component';
import { SysAdminComponent } from './sys-admin.component';

const routes: Routes = [
  {
    path: '',
    component: SysAdminComponent,
    children: [
      {
        path: '',
        component: CommunityControlsComponent
      },
      {
        path: 'admin-page-ads',
        component: AdminPageAdsComponent,
        children: [
          {
            path: '',
            component: AdminPageAdsListComponent
          },
          {
            path: 'form/:ad_id',
            component: AdminPageAdsFormComponent
          }
        ]
      },
      {
        path: 'admin-surveys',
        component: AdminSurveysComponent
      },
      {
        path: 'community-builds',
        component: CommunityBuildsComponent
      },
      {
        path: 'labs',
        component: LabsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysAdminRoutingModule {
}
