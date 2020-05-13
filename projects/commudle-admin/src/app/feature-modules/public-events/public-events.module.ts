import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicEventsRoutingModule } from './public-events-routing.module';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { SpeakerSessionPageComponent } from './components/speaker-session-page/speaker-session-page.component';
import { SpeakerSessionDiscussionComponent } from './components/speaker-session-discussion/speaker-session-discussion.component';
import { NbCardModule, NbListModule, NbInputModule, NbButtonModule, NbIconModule, NbTooltipModule, NbPopoverModule } from '@nebular/theme';
import { SessionDiscussionQuestionComponent } from './components/session-discussion-question/session-discussion-question.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeEventComponent,
    SpeakerSessionPageComponent,
    SpeakerSessionDiscussionComponent,
    SessionDiscussionQuestionComponent
  ],
  imports: [
    CommonModule,
    PublicEventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    // Nebular
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbPopoverModule
  ]
})
export class PublicEventsModule { }
