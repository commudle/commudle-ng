import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';

const routes: Routes = [
  {
    path: 'new',
    component: CreateDataFormComponent
  },
  {
    path: ':id/edit',
    component: EditDataFormComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataFormsRoutingModule { }
