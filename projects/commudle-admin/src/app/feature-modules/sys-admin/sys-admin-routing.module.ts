import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysAdminComponent } from './sys-admin.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';

const routes: Routes = [
  {
    path: '',
    component: SysAdminComponent
  },
  {
    path: 'admin-surveys',
    component: AdminSurveysComponent
  },
  {
    path: 'community-builds',
    component: CommunityBuildsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysAdminRoutingModule { }
