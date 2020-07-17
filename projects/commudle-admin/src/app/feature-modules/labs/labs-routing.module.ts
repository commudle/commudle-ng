import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabsComponent } from './components/labs/labs.component';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';
import { CreateLabComponent } from './components/create-lab/create-lab.component';
import { EditLabComponent } from './components/edit-lab/edit-lab.component';

const routes: Routes = [
  {
    path: '',
    component: LabsComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateLabComponent

  },
  {
    path: ':lab_id/edit',
    canActivate: [AuthGuard],
    component: EditLabComponent

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabsRoutingModule { }
