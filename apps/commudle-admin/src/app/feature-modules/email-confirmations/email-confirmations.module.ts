import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmailConfirmationsRoutingModule } from './email-confirmations-routing.module';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { CollaborationCommunityComponent } from './components/collaboration-community/collaboration-community.component';
import { UserRoleConfirmationComponent } from './components/user-role-confirmation/user-role-confirmation.component';
import { NbIconModule, NbCardModule, NbSpinnerModule, NbToggleModule } from '@commudle/theme';
import { EmailUnsubscribeComponent } from './components/email-unsubscribe/email-unsubscribe.component';
import { FormsModule } from '@angular/forms';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { HackathonJudgeConfirmationComponent } from './components/hackathon-judge-confirmation/hackathon-judge-confirmation.component';
import { HackathonTeamConfirmationComponent } from './components/hackathon-team-confirmation/hackathon-team-confirmation.component';

@NgModule({
  declarations: [
    RsvpComponent,
    CollaborationCommunityComponent,
    UserRoleConfirmationComponent,
    EmailUnsubscribeComponent,
    HackathonJudgeConfirmationComponent,
    HackathonTeamConfirmationComponent,
  ],
  imports: [
    CommonModule,
    EmailConfirmationsRoutingModule,
    FormsModule,
    SharedDirectivesModule,
    SharedPipesModule,

    // Nebular
    NbIconModule,
    NbCardModule,
    NbSpinnerModule,
    NbToggleModule,
  ],
})
export class EmailConfirmationsModule {}
