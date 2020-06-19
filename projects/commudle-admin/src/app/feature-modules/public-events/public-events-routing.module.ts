import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { SpeakerSessionPageComponent } from './components/speaker-session-page/speaker-session-page.component';
import { EventDetailsResolver } from '../../resolvers/event-details.resolver';
import { PublicEventDetailsResolver } from '../../resolvers/public-event-details.resolver';


const routes: Routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver,
      event: PublicEventDetailsResolver
    },
    children: [
      {
        path: '',
        component: HomeEventComponent
      },
      {
        path: 'session',
        component: SpeakerSessionPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicEventsRoutingModule { }
