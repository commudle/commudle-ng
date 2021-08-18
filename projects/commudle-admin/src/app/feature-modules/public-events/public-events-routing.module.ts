import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityDetailsResolver } from 'projects/commudle-admin/src/app/resolvers/community-details.resolver';
import { PublicEventDetailsResolver } from 'projects/commudle-admin/src/app/resolvers/public-event-details.resolver';
import { HmsBeamComponent } from 'projects/shared-modules/hms-video/components/hms-beam/hms-beam.component';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { SessionPageComponent } from './components/session-page/session-page.component';
import { SpeakerSessionPageComponent } from './components/speaker-session-page/speaker-session-page.component';

const routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver,
      event: PublicEventDetailsResolver,
    },
    children: [
      {
        path: '',
        component: HomeEventComponent,
      },
      {
        path: 'session',
        component: SessionPageComponent,
      },
      {
        path: 'beam',
        component: HmsBeamComponent,
      },
      {
        path: 'session-old',
        component: SpeakerSessionPageComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicEventsRoutingModule {}
