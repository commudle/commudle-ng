import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeListSpeakersComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/components/public-home-list-speakers/public-home-list-speakers.component';

const routes: Routes = [
  {
    path: '',
    component: PublicHomeListSpeakersComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicHomeListSpeakersRoutingModule {}
