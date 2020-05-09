import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailConfirmationsRoutingModule } from './email-confirmations-routing.module';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { CollaborationCommunityComponent } from './components/collaboration-community/collaboration-community.component';
import { SpeakerSessionDetailsComponent } from './components/speaker-session-details/speaker-session-details.component';
import { UserRoleConfirmationComponent } from './components/user-role-confirmation/user-role-confirmation.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbIconModule, NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [
    RsvpComponent,
    CollaborationCommunityComponent,
    SpeakerSessionDetailsComponent,
    UserRoleConfirmationComponent,
  ],
  imports: [
    CommonModule,
    EmailConfirmationsRoutingModule,



    // Nebular
    NbIconModule,
    NbCardModule
  ]
})
export class EmailConfirmationsModule { }
