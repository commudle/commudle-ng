import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainNewsletterList } from './components/main-newsletter-list/main-newsletter-list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'newsletters-list',
        component: MainNewsletterList,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicNewslettersRoutingModule { }
