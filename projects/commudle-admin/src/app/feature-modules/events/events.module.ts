import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventsRoutingModule } from './events-routing.module';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { NbCheckboxModule, NbSelectModule, NbInputModule, NbCardModule, NbButtonModule } from '@nebular/theme';
import { CollaboratingCommunitiesComponent } from './components/collaborating-communities/collaborating-communities.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EventFormResponsesComponent } from './components/event-form-responses/event-form-responses.component';
import { EventScheduleComponent } from './components/event-schedule/event-schedule.component';
import { EventCommentsComponent } from './components/event-comments/event-comments.component';
import { EventStatsComponent } from './components/event-stats/event-stats.component';


@NgModule({
  declarations: [
    CreateEventComponent,
    EditEventComponent,
    CollaboratingCommunitiesComponent,
    VolunteersComponent,
    EventFormResponsesComponent,
    EventScheduleComponent,
    EventCommentsComponent,
    EventStatsComponent,
  ],
  imports: [
    CommonModule,
    EventsRoutingModule,
    ReactiveFormsModule,

    // External
    FontAwesomeModule,


    //Nebula
    NbButtonModule,
    NbCardModule,
    NbInputModule,
    NbSelectModule,
    NbCheckboxModule,
  ]
})
export class EventsModule { }
