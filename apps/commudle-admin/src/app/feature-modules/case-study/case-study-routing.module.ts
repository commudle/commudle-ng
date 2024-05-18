import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseStudyComponent } from 'apps/commudle-admin/src/app/feature-modules/case-study/components/case-study/case-study.component';

const routes: Routes = [
  {
    path: '',
    component: CaseStudyComponent,
  },
  {
    path: ':id',
    component: CaseStudyComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseStudyRoutingModule {}
