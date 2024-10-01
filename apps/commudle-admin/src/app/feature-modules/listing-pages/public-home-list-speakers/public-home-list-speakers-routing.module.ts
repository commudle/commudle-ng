import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicHomeListSpeakersProfileComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/components/public-home-list-speakers-profile/public-home-list-speakers-profile.component';
import { PublicHomeListSpeakersComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/components/public-home-list-speakers/public-home-list-speakers.component';
import { SpeakerSlidesComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/components/speaker-slides/speaker-slides.component';
import { SpeakerCfpComponent } from 'apps/commudle-admin/src/app/feature-modules/listing-pages/public-home-list-speakers/speaker-cfp/speaker-cfp.component';

const routes: Routes = [
  {
    path: '',
    component: PublicHomeListSpeakersComponent,
    children: [
      {
        path: '',
        component: PublicHomeListSpeakersProfileComponent,
      },
      {
        path: 'speaker-slides',
        component: SpeakerSlidesComponent,
      },
      {
        path: 'cfp',
        component: SpeakerCfpComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicHomeListSpeakersRoutingModule {}
