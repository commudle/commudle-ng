import { CommunityFormsListComponent } from './components/community-control-panel/community-forms-list/community-forms-list.component';
import { CommunityEventsListComponent } from './components/community-control-panel/community-events-list/community-events-list.component';
import { CommunityDetailsResolver } from './resolvers/community-details.resolver';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';
import { LibErrorHandlerComponent } from 'projects/lib-error-handler/src/public-api';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { HomeComponent } from './components/home/home.component';
import { FillDataFormComponent } from './components/fill-data-form/fill-data-form.component';
import { EUserRoles } from 'projects/shared-models/enums/user_roles.enum';
import { LogoutComponent } from './components/logout/logout.component';
import { SpeakerResourceFormComponent } from './components/speaker-resource-form/speaker-resource-form.component';
import { InitResolver } from './resolvers/init.resolver';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CommunityStatsComponent } from './components/community-control-panel/community-stats/community-stats.component';
import { CommunityCreateComponent } from './components/community-control-panel/community-create/community-create.component';
import { CommunitiesComponent } from './components/home/communities/communities.component';
import { FeaturesComponent } from './components/home/features/features.component';
import { AboutComponent } from './components/home/about/about.component';
import { CommunityTeamComponent } from './components/community-control-panel/community-team/community-team.component';
import { CommunityEditDetailsComponent } from './components/community-control-panel/community-edit-details/community-edit-details.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: 'features',
    component: FeaturesComponent
  },
  {
    path: 'communities',
    component: CommunitiesComponent
  },
  {
    path: 'communities/:community_id',
    loadChildren: () => import('./feature-modules/public-community/public-community.module').then(m => m.PublicCommunityModule)
  },
  {
    path: 'communities/:community_id/events/:event_id',
    loadChildren: () => import('./feature-modules/public-events/public-events.module').then(m => m.PublicEventsModule)
  },
  {
    path: 'orgs',
    loadChildren: () => import('./feature-modules/public-community-groups/public-community-groups.module').then(m => m.PublicCommunityGroupsModule)
  },
  {
    path: 'fill-form/:data_form_entity_id',
    component: FillDataFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-profile/edit',
    component: EditProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'email-confirmations',
    loadChildren: () => import('./feature-modules/email-confirmations/email-confirmations.module').then(m => m.EmailConfirmationsModule)
  },
  {
    path: 'help',
    loadChildren: () => import('./feature-modules/help/help.module').then(m => m.HelpModule)
  },
  {
    path: 'speaker-resource-form',
    canActivate: [AuthGuard],
    component: SpeakerResourceFormComponent
  },
  {
    path: 'sys-admin',
    loadChildren: () => import('./feature-modules/sys-admin/sys-admin.module').then(m => m.SysAdminModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'builds',
    loadChildren: () => import('./feature-modules/community-builds/community-builds.module').then(m => m.CommunityBuildsModule)
  },
  {
    path: 'labs',
    loadChildren: () => import('./feature-modules/labs/labs.module').then(m => m.LabsModule)
  },
  {
    path: 'policies',
    loadChildren: () => import('./feature-modules/policies/policies.module').then(m => m.PoliciesModule)
  },
  {
    path: 'admin',
    children: [
      // {
      //   path: 'communities', component: OrganizerCommunitiesListComponent,
      //   canActivate: [AuthGuard],
      //   data: {
      //     expectedRoles: [EUserRoles.ORGANIZER, EUserRoles.SYSTEM_ADMINISTRATOR]
      //   },
      // },
      {
        path: 'communities/new',
        component: CommunityCreateComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.COMMUNITY_ADMIN, EUserRoles.SYSTEM_ADMINISTRATOR]
        },
      },
      {
        path: 'communities/:name',
        component: CommunityControlPanelComponent,
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.ORGANIZER, EUserRoles.SYSTEM_ADMINISTRATOR]
        },
        children: [
          {
            path: '',
            component: CommunityEventsListComponent
          },
          {
            path: 'forms',
            component: CommunityFormsListComponent
          },
          {
            path: 'edit',
            component: CommunityEditDetailsComponent
          },
          {
            path: 'team',
            component: CommunityTeamComponent
          }
        ]
      },
      {
        path: 'communities/:community_id/stats',
        component: CommunityStatsComponent,
        canActivate: [AuthGuard],
        resolve: {
          community: CommunityDetailsResolver
        },
        data: {
          expectedRoles: [EUserRoles.ORGANIZER, EUserRoles.SYSTEM_ADMINISTRATOR]
        },
      },
      {
        path: 'forms',
        loadChildren: () => import('./feature-modules/data-forms/data-forms.module').then(m => m.DataFormsModule)
      },
      {
        path: 'communities/:community_id/event-dashboard',
        loadChildren: () => import('./feature-modules/events/events.module').then(m => m.EventsModule)
      },
      {
        path: 'orgs',
        loadChildren: () => import('./feature-modules/community-groups/community-groups.module').then(m => m.CommunityGroupsModule)
      },
    ],

  },
  {path: 'logout', component: LogoutComponent},
  {path: 'error', component: LibErrorHandlerComponent},
  {path: '**', redirectTo: '/error'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
  exports: [RouterModule],
  providers: [InitResolver]
})
export class AppRoutingModule { }
