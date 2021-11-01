import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicPageGuidelinesComponent } from './components/public-page-guidelines/public-page-guidelines.component';
import { PublicPagesResolver } from './resolvers/public-pages.resolver';

const routes = [
  {
    path: ':name',
    component: PublicPageGuidelinesComponent,
    resolve: {
      publicPage: PublicPagesResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicPagesRoutingModule {}
