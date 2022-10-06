import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTimepickerModule,
  NbToggleModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { LinkyModule } from 'ngx-linky';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
import { AppSharedComponentsModule } from '../../app-shared-components/app-shared-components.module';
import { ReusableComponentsModule } from '../reusable-components/reusable-components.module';
import { CollaboratingCommunitiesComponent } from './components/collaborating-communities/collaborating-communities.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventCommentsComponent } from './components/event-comments/event-comments.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { FormGroupsComponent } from './components/event-dashboard/form-groups/form-groups.component';
import { EventDetailsComponent } from './components/event-details/event-details.component';
import { EventEmbeddedVideoStreamComponent } from './components/event-embedded-video-stream/event-embedded-video-stream.component';
import { EventFormResponsesComponent } from './components/event-form-responses/event-form-responses.component';
import { UserDetailsCellComponent } from './components/event-form-responses/user-details-cell/user-details-cell.component';
import { EventLocationTracksComponent } from './components/event-locations/event-location-tracks/event-location-tracks.component';
import { EventLocationsComponent } from './components/event-locations/event-locations.component';
import { EventRecordingsComponent } from './components/event-recordings/event-recordings.component';
import { EventSimpleRegistrationComponent } from './components/event-simple-registration/event-simple-registration.component';
import { EventSpeakersComponent } from './components/event-speakers/event-speakers.component';
import { EventStatsComponent } from './components/event-stats/event-stats.component';
import { EventStatusComponent } from './components/event-status/event-status.component';
import { EventUpdatesComponent } from './components/event-updates/event-updates.component';
import { SponsorsComponent } from './components/sponsors/sponsors.component';
import { EntryPassScanComponent } from './components/user-event-registrations/entry-pass-scan/entry-pass-scan.component';
import { UserDetailsComponent } from './components/user-event-registrations/user-details/user-details.component';
import { UserEventRegistrationsComponent } from './components/user-event-registrations/user-event-registrations.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EventsRoutingModule } from './events-routing.module';
import { UserEngagementDataComponent } from './components/event-form-responses/user-engagement-data/user-engagement-data.component';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  declarations: [
    CreateEventComponent,
    EditEventComponent,
    CollaboratingCommunitiesComponent,
    VolunteersComponent,
    EventFormResponsesComponent,
    EventCommentsComponent,
    EventStatsComponent,
    EventDashboardComponent,
    FormGroupsComponent,
    UserDetailsCellComponent,
    EventLocationsComponent,
    EventLocationTracksComponent,
    EventUpdatesComponent,
    EventStatusComponent,
    EventSimpleRegistrationComponent,
    UserEventRegistrationsComponent,
    UserDetailsComponent,
    EventEmbeddedVideoStreamComponent,
    SponsorsComponent,
    EventSpeakersComponent,
    EventRecordingsComponent,
    EventDetailsComponent,
    EntryPassScanComponent,
    UserEngagementDataComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AppSharedComponentsModule,
    YouTubePlayerModule,
    ReusableComponentsModule,
    SharedDirectivesModule,
    MiniUserProfileModule,
    SharedComponentsModule,
    ScrollingModule,
    SharedPipesModule,

    // External
    FontAwesomeModule,
    NgxDatatableModule,
    LinkyModule,
    ZXingScannerModule,

    //Nebular
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
    NbDatepickerModule,
    NbAlertModule,
    NbListModule,
    NbTooltipModule,
    NbWindowModule.forChild(),
    NbIconModule,
    NbAutocompleteModule,
    NbToggleModule,
    NbPopoverModule,
    NbRadioModule,
    NbToggleModule,
    NbAccordionModule,
    NbTooltipModule,
    NbTabsetModule,
    NbTimepickerModule,
    NbActionsModule,
    NbButtonGroupModule,
    NbIconModule,
    NbFormFieldModule,
    NbSpinnerModule,
  ],
  exports: [UserDetailsComponent],
})
export class EventsModule {}
