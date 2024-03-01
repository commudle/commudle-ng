import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeListExpertsComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-experts/components/public-home-list-experts/public-home-list-experts.component';

const routes: Routes = [
  {
    path: '',
    component: PublicHomeListExpertsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicHomeListExpertsRoutingModule {}
