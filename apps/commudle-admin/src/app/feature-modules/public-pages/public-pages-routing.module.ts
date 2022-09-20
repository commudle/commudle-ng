import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicPageGuidelinesComponent } from './components/public-page-guidelines/public-page-guidelines.component';

const routes = [
  {
    path: ':name',
    component: PublicPageGuidelinesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
