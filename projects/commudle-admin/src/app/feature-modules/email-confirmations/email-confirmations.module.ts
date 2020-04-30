import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailConfirmationsRoutingModule } from './email-confirmations-routing.module';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { CollaborationCommunityComponent } from './components/collaboration-community/collaboration-community.component';
import { SpeakerSessionDetailsComponent } from './components/speaker-session-details/speaker-session-details.component';


@NgModule({
  declarations: [
    RsvpComponent,
    CollaborationCommunityComponent,
    SpeakerSessionDetailsComponent
  ],
  imports: [
    CommonModule,
    EmailConfirmationsRoutingModule
  ]
})
export class EmailConfirmationsModule { }
