import { CreateNewsletterComponent } from './components/create-newsletter/create-newsletter.component';
import { NewsletterComponent } from './components/newsletter/newsletter.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';

const routes: Routes = [
  {
    path: '',
    component: NewsletterComponent
  },
  {
    path: 'create',
    canActivate: [AuthGuard],
    component: CreateNewsletterComponent

  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewslettersRoutingModule { }
