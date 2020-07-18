import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {EventsRoutingModule} from './events-routing.module';
import {CreateEventComponent} from './components/create-event/create-event.component';
import {EditEventComponent} from './components/edit-event/edit-event.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbAccordionModule
 } from '@nebular/theme';
import { CollaboratingCommunitiesComponent } from './components/collaborating-communities/collaborating-communities.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EventFormResponsesComponent } from './components/event-form-responses/event-form-responses.component';
import { EventCommentsComponent } from './components/event-comments/event-comments.component';
import { EventStatsComponent } from './components/event-stats/event-stats.component';
import { EditorModule } from '@tinymce/tinymce-angular';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { FormGroupsComponent } from './components/event-dashboard/form-groups/form-groups.component';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { UserDetailsCellComponent } from './components/event-form-responses/user-details-cell/user-details-cell.component';
import { EventLocationsComponent } from './components/event-locations/event-locations.component';
import { EventLocationTracksComponent } from './components/event-locations/event-location-tracks/event-location-tracks.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { EventUpdatesComponent } from './components/event-updates/event-updates.component';
import { EventStatusComponent } from './components/event-status/event-status.component';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { EventSimpleRegistrationComponent } from './components/event-simple-registration/event-simple-registration.component';
import { UserEventRegistrationsComponent } from './components/user-event-registrations/user-event-registrations.component';
import { UserDetailsComponent } from './components/user-event-registrations/user-details/user-details.component';
import { EventEmbeddedVideoStreamComponent } from './components/event-embedded-video-stream/event-embedded-video-stream.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { AppSharedComponentsModule } from '../../app-shared-components/app-shared-components.module';


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
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    AppSharedComponentsModule,
    SharedComponentsModule,
    YouTubePlayerModule,


    // External
    FontAwesomeModule,
    NgxDatatableModule,
    NgxMaterialTimepickerModule,


    // Nebular
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
    NbActionsModule
  ]
})
export class EventsModule {
}
