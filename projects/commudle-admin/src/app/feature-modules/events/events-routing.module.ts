import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { CollaboratingCommunitiesComponent } from './components/collaborating-communities/collaborating-communities.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EventFormResponsesComponent } from './components/event-form-responses/event-form-responses.component';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { EventDetailsResolver } from '../../resolvers/event-details.resolver';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver
    },
    children: [
      {
        path: 'new',
        component: CreateEventComponent
      },
      {
        path: ':event_id',
        resolve: {
          event: EventDetailsResolver
        },
        children: [
          {
            path: '',
            component: EventDashboardComponent
          },
          {
            path: 'edit',
            component: EditEventComponent
          },
          {
            path: 'collaborating-communities',
            component: CollaboratingCommunitiesComponent
          },
          {
            path: 'volunteers',
            component: VolunteersComponent
          },
          {
            path: ':id/form-responses',
            component: EventFormResponsesComponent
          },
          {
            path: 'form-responses',
            component: EventFormResponsesComponent
          }

        ]
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [
    CommunityDetailsResolver,
    EventDetailsResolver
  ]
})
export class EventsRoutingModule { }
