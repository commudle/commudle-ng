import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LabsComponent } from './components/labs/labs.component';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';
import { CreateLabComponent } from './components/create-lab/create-lab.component';
import { EditLabComponent } from './components/edit-lab/edit-lab.component';
import { MyLabsComponent } from './components/my-labs/my-labs.component';
import { LabComponent } from './components/lab/lab.component';
import { LabStepComponent } from './components/lab/lab-step/lab-step.component';

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
    path: 'my-labs',
    canActivate: [AuthGuard],
    component: MyLabsComponent
  },
  {
    path: ':lab_id/edit',
    canActivate: [AuthGuard],
    component: EditLabComponent

  },
  {
    path: ':lab_id',
    component: LabComponent,
    children: [
      {
        path: 'steps/:step_id',
        component: LabStepComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LabsRoutingModule { }
