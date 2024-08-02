import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { EventDetailsResolver } from '../../resolvers/event-details.resolver';
import { CollaboratingCommunitiesComponent } from './components/collaborating-communities/collaborating-communities.component';
import { CreateEventComponent } from './components/create-event/create-event.component';
import { EditEventComponent } from './components/edit-event/edit-event.component';
import { EventDashboardComponent } from './components/event-dashboard/event-dashboard.component';
import { EventFormResponsesComponent } from './components/event-form-responses/event-form-responses.component';
import { EventStatsComponent } from './components/event-stats/event-stats.component';
import { EntryPassScanComponent } from './components/user-event-registrations/entry-pass-scan/entry-pass-scan.component';
import { ExitPassScanComponent } from './components/user-event-registrations/exit-pass-scan/exit-pass-scan.component';
import { UserEventRegistrationsComponent } from './components/user-event-registrations/user-event-registrations.component';
import { VolunteersComponent } from './components/volunteers/volunteers.component';
import { EventDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-details/event-details.component';
import { EventUpdatesComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-updates/event-updates.component';
import { EventAgendaComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-agenda/event-agenda.component';
import { EventRegistrationsComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-registrations/event-registrations.component';
import { SponsorsComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/sponsors/sponsors.component';
import { CommunityEmailsListComponent } from 'apps/commudle-admin/src/app/feature-modules/reusable-components/components/community-emails-list/community-emails-list.component';
import { EventCheckedInListComponent } from 'apps/commudle-admin/src/app/feature-modules/events/components/event-checked-in-list/event-checked-in-list.component';
import { QuestionTypesResolver } from 'apps/shared-resolvers/question-types.resolver';

const routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver,
    },
    children: [
      {
        path: 'new',
        component: CreateEventComponent,
      },
      {
        path: ':event_id',
        runGuardsAndResolvers: 'always',
        resolve: {
          event: EventDetailsResolver,
        },
        children: [
          {
            path: '',
            runGuardsAndResolvers: 'always',
            component: EventDashboardComponent,
            children: [
              {
                path: '',
                component: EventDetailsComponent,
              },
              {
                path: 'stats',
                component: EventStatsComponent,
              },
              {
                path: 'edit',
                component: EditEventComponent,
              },
              {
                path: 'updates',
                component: EventUpdatesComponent,
              },
              {
                path: 'agenda',
                component: EventAgendaComponent,
              },
              {
                path: 'registrations',
                component: EventRegistrationsComponent,
                resolve: {
                  questionTypes: QuestionTypesResolver,
                },
              },
              {
                path: 'collaborations',
                component: CollaboratingCommunitiesComponent,
              },
              {
                path: 'volunteers',
                component: VolunteersComponent,
              },
              {
                path: 'sponsors',
                component: SponsorsComponent,
              },
              {
                path: 'emails',
                component: CommunityEmailsListComponent,
              },
              {
                path: 'form-responses',
                component: EventFormResponsesComponent,
              },
            ],
          },

          {
            path: 'collaborating-communities',
            component: CollaboratingCommunitiesComponent,
          },
          {
            path: 'volunteers',
            component: VolunteersComponent,
          },
          {
            path: 'form-responses',
            component: EventFormResponsesComponent,
          },
          {
            path: ':event_simple_registration_id/user-event-registrations',
            component: UserEventRegistrationsComponent,
          },
          {
            path: 'scan-entry-pass',
            children: [
              {
                path: '',
                component: EntryPassScanComponent,
              },
              {
                path: 'checked-in-list',
                component: EventCheckedInListComponent,
              },
            ],
          },
          {
            path: 'scan-exit-pass',
            component: ExitPassScanComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes as Routes)],
  exports: [RouterModule],
  providers: [CommunityDetailsResolver, EventDetailsResolver],
})
export class EventsRoutingModule {}
