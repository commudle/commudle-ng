import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysAdminComponent } from './sys-admin.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { LabsComponent } from './components/labs/labs.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';

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
export class SysAdminRoutingModule { }
