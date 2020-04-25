import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NbCheckboxModule, NbSelectModule, NbInputModule, NbCardModule, NbButtonModule, NbDatepickerModule, NbAlertModule, NbListModule, NbTooltipModule, NbWindowModule, NbIconModule } from '@nebular/theme';
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
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';


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
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,

    // External
    FontAwesomeModule,
    NgxDatatableModule,
    NgxMaterialTimepickerModule,




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
    NbIconModule
  ]
})
export class EventsModule { }
