import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExpertsProgramComponent } from 'apps/commudle-admin/src/app/feature-modules/expert-program/components/experts-program/experts-program.component';

const routes: Routes = [
  {
    path: '',
    component: ExpertsProgramComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExpertProgramRoutingModule {}
