import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PublicEventsRoutingModule } from './public-events-routing.module';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { SpeakerSessionPageComponent } from './components/speaker-session-page/speaker-session-page.component';
import {
    NbCardModule,
    NbListModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTooltipModule,
    NbPopoverModule,
    NbTabsetModule,
    NbBadgeModule,
    NbAlertModule, NbActionsModule, NbUserModule,
} from '@nebular/theme';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { HighlightedLinksComponent } from './components/highlighted-links/highlighted-links.component';
import { LiveSessionsComponent } from './components/live-sessions/live-sessions.component';
import { AgendaComponent } from './components/agenda/agenda.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { EventUpdatesComponent } from './components/event-updates/event-updates.component';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { CollaborationCommunitiesComponent } from './components/collaboration-communities/collaboration-communities.component';
import { TeamComponent } from './components/team/team.component';
import { EventLocationTracksComponent } from './components/agenda/event-location-tracks/event-location-tracks.component';
import { AttendingMembersComponent } from './components/attending-members/attending-members.component';

@NgModule({
  declarations: [
    HomeEventComponent,
    SpeakerSessionPageComponent,
    HighlightedLinksComponent,
    LiveSessionsComponent,
    AgendaComponent,
    SpeakersComponent,
    EventUpdatesComponent,
    EventDescriptionComponent,
    CollaborationCommunitiesComponent,
    TeamComponent,
    EventLocationTracksComponent,
    AttendingMembersComponent,
  ],
    imports: [
        CommonModule,
        PublicEventsRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        SharedComponentsModule,

        // Nebular
        NbCardModule,
        NbListModule,
        NbInputModule,
        NbButtonModule,
        NbIconModule,
        NbTooltipModule,
        NbPopoverModule,
        NbTabsetModule,
        NbBadgeModule,
        NbAlertModule,
        NbActionsModule,
        NbUserModule
    ]
})
export class PublicEventsModule { }
