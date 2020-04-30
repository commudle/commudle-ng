import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { CollaborationCommunityComponent } from './components/collaboration-community/collaboration-community.component';
import { SpeakerSessionDetailsComponent } from './components/speaker-session-details/speaker-session-details.component';


const routes: Routes = [
  {
    path: 'event-rsvp',
    component: RsvpComponent
  },
  {
    path: 'collaboration-community',
    component: CollaborationCommunityComponent
  },
  {
    path: 'speaker-session-details',
    component: SpeakerSessionDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmailConfirmationsRoutingModule { }
