import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@commudle/theme';
import { SkeletonScreensModule } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/skeleton-screens.module';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { AgendaComponent } from './components/agenda/agenda.component';
import { EventLocationTracksComponent } from './components/agenda/event-location-tracks/event-location-tracks.component';
import { AttendedMembersCardComponent } from './components/attended-members/attended-members-card/attended-members-card.component';
import { AttendedMembersComponent } from './components/attended-members/attended-members.component';
import { AttendingMembersComponent } from './components/attending-members/attending-members.component';
import { AutoAttendanceComponent } from './components/auto-attendance/auto-attendance.component';
import { CollaborationCommunitiesComponent } from './components/collaboration-communities/collaboration-communities.component';
import { EventDescriptionComponent } from './components/event-description/event-description.component';
import { EventUpdatesComponent } from './components/event-updates/event-updates.component';
import { HighlightedLinksComponent } from './components/highlighted-links/highlighted-links.component';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { LiveSessionsComponent } from './components/live-sessions/live-sessions.component';
import { SessionPageDetailsComponent } from './components/session-page/session-page-details/session-page-details.component';
import { SessionPageChatComponent } from './components/session-page/session-page-video/session-page-chat/session-page-chat.component';
import { SessionPagePollComponent } from './components/session-page/session-page-video/session-page-poll/session-page-poll.component';
import { SessionPageQnaComponent } from './components/session-page/session-page-video/session-page-qna/session-page-qna.component';
import { SessionPageVideoComponent } from './components/session-page/session-page-video/session-page-video.component';
import { SessionPageViewersComponent } from './components/session-page/session-page-video/session-page-viewers/session-page-viewers.component';
import { SessionPageComponent } from './components/session-page/session-page.component';
import { SpeakersComponent } from './components/speakers/speakers.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { TeamComponent } from './components/team/team.component';
import { PublicEventsRoutingModule } from './public-events-routing.module';

@NgModule({
  declarations: [
    HomeEventComponent,
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
    AutoAttendanceComponent,
    SponsorsComponent,
    SessionPageComponent,
    SessionPageDetailsComponent,
    SessionPageVideoComponent,
    SessionPageChatComponent,
    SessionPageQnaComponent,
    SessionPagePollComponent,
    SessionPageViewersComponent,
    AttendedMembersComponent,
    AttendedMembersCardComponent,
  ],
  imports: [
    CommonModule,
    PublicEventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedComponentsModule,
    SharedPipesModule,
    SharedDirectivesModule,
    MiniUserProfileModule,
    SkeletonScreensModule,

    // external
    FontAwesomeModule,

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
    NbUserModule,
    NbToggleModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbAccordionModule,
  ],
})
export class PublicEventsModule {}
