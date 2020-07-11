import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SysAdminComponent } from './sys-admin.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';

const routes: Routes = [
  {
    path: '',
    component: SysAdminComponent
  },
  {
    path: 'admin-surveys',
    component: AdminSurveysComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysAdminRoutingModule { }
