import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { SpeakerSessionPageComponent } from './components/speaker-session-page/speaker-session-page.component';


const routes: Routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver
    },
    children: [
      {
        path: '',
        component: HomeEventComponent
      },
      {
        path: 'speaker-session/:track_slot_id',
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
