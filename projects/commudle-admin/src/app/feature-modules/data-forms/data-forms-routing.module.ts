import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';
import { QuestionTypesResolver } from 'projects/shared-resolvers/question-types.resolver';

const routes: Routes = [
  {
    path: '',
    resolve: {
      questionTypes: QuestionTypesResolver
    },
    children: [
      {
        path: 'new',
        component: CreateDataFormComponent
      },
      {
        path: ':id/edit',
        component: EditDataFormComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuestionTypesResolver]
})
export class DataFormsRoutingModule { }
