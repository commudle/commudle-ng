import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { PublicEventDetailsResolver } from '../../resolvers/public-event-details.resolver';
import { HomeEventComponent } from './components/home-event/home-event.component';
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
