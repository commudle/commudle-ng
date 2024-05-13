import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CaseStudyTaaranganaComponent } from 'apps/commudle-admin/src/app/feature-modules/case-study/components/case-study-taarangana/case-study-taarangana.component';

const routes: Routes = [
  {
    path: '',
    component: CaseStudyTaaranganaComponent,
  },
  {
    path: ':id',
    component: CaseStudyTaaranganaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaseStudyRoutingModule {}
