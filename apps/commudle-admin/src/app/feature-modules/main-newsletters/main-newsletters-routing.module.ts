import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckRedirectGuard } from '@commudle/shared-services';
import { AuthGuard } from '@commudle/shared-services';
import { IndexComponent } from './components/index/index.component';
import { MainNewsletterFormComponent } from './components/main-newsletter-form/main-newsletter-form.component';
import { MainNewsletterComponent } from './components/main-newsletter/main-newsletter.component';

const routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: 'new',
        component: MainNewsletterFormComponent,
        canDeactivate: [CheckRedirectGuard],
      },
      {
        path: ':main_newsletter_id',
        component: MainNewsletterComponent,
      },
      {
        path: ':main_newsletter_id/edit',
        component: MainNewsletterFormComponent,
        canDeactivate: [CheckRedirectGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MainNewslettersRoutingModule {}
