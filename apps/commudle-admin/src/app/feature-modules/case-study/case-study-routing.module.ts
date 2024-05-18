import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseStudiesComponent } from 'apps/commudle-admin/src/app/feature-modules/case-study/components/case-studies/case-studies.component';
import { CaseStudyComponent } from 'apps/commudle-admin/src/app/feature-modules/case-study/components/case-study/case-study.component';

const routes: Routes = [
  {
    path: '',
    component: CaseStudiesComponent,
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
