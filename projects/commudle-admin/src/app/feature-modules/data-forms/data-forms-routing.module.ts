import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { QuestionTypesResolver } from 'projects/shared-resolvers/question-types.resolver';
import { CreateDataFormComponent } from './components/create-data-form/create-data-form.component';
import { EditDataFormComponent } from './components/edit-data-form/edit-data-form.component';

const routes = [
  {
    path: '',
    resolve: {
      questionTypes: QuestionTypesResolver,
    },
    children: [
      {
        path: 'new',
        component: CreateDataFormComponent,
      },
      {
        path: ':id/edit',
        component: EditDataFormComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [QuestionTypesResolver],
})
export class DataFormsRoutingModule {}
