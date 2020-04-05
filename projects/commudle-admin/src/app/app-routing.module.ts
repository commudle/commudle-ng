import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';
import { LibErrorHandlerComponent } from 'projects/lib-error-handler/src/public-api';
import { OrganizerCommunitiesListComponent } from './components/organizer-communities-list/organizer-communities-list.component';
import { AppComponent } from './app.component';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityFormsListComponent } from './components/community-control-panel/community-forms-list/community-forms-list.component';
import { CommunityEventsListComponent } from './components/community-control-panel/community-events-list/community-events-list.component';
import { CommunityEditDetailsComponent } from './components/community-control-panel/community-edit-details/community-edit-details.component';
import { CommunityTeamComponent } from './components/community-control-panel/community-team/community-team.component';
import { CommunityDetailsResolver } from './resolvers/community-details.resolver';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    // canLoad: [AuthGuard],
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        children: [
          // add multiple dashboard page routes here
          {
            path: 'communities', component: OrganizerCommunitiesListComponent
          },
          {
            path: 'communities/:name',
            component: CommunityControlPanelComponent,
            children: [
              {
                path: 'forms', component: CommunityFormsListComponent
              },
              {
                path: 'events', component: CommunityEventsListComponent
              },
              {
                path: 'about', component: CommunityEditDetailsComponent,
              },
              {
                path: 'team', component: CommunityTeamComponent
              }
            ]
          }

        ]
      }
    ]
  },
  {path: 'error', component: LibErrorHandlerComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  // providers: [CommunityDetailsResolver]
})
export class AppRoutingModule { }
