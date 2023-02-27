import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewsletterListComponent } from './components/newsletter-list/newsletter-list.component';

const routes = [
  {
    path: '',
    component: NewsletterListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicNewslettersRoutingModule {}
