import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from 'projects/shared-services/lib-authwatch.guard';
import {LibErrorHandlerComponent} from 'projects/lib-error-handler/src/public-api';
import {HomeComponent} from './components/home/home.component';
import {FillDataFormComponent} from './components/fill-data-form/fill-data-form.component';
import {EUserRoles} from 'projects/shared-models/enums/user_roles.enum';
import {LogoutComponent} from './components/logout/logout.component';
import {SpeakerResourceFormComponent} from './components/speaker-resource-form/speaker-resource-form.component';
import {InitResolver} from './resolvers/init.resolver';
import {CommunitiesComponent} from './components/home/communities/communities.component';
import {FeaturesComponent} from './components/home/features/features.component';
import {AboutComponent} from './components/home/about/about.component';
import { MainNewsletterComponent } from './feature-modules/main-newsletters/components/main-newsletter/main-newsletter.component';

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
    path: 'users',
    loadChildren: () => import('./feature-modules/users/users.module').then(m => m.UsersModule)
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
    path: 'communities/:community_id/channels',
    loadChildren: () => import('./feature-modules/community-channels/community-channels.module').then(m => m.CommunityChannelsModule)
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
    path: 'email-confirmations',
    loadChildren: () => import('./feature-modules/email-confirmations/email-confirmations.module').then(m => m.EmailConfirmationsModule)
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
    path: 'feed',
    loadChildren: () => import('./feature-modules/external-feed/external-feed.module').then(m => m.ExternalFeedModule)
  },
  {
    path: 'labs',
    loadChildren: () => import('./feature-modules/labs/labs.module').then(m => m.LabsModule)
  },
  {
    path: 'pricing',
    loadChildren: () => import('./feature-modules/pricing/pricing.module').then(m => m.PricingModule)
  },
  {
    path: 'speaker-resources',
    loadChildren: () => import('./feature-modules/speaker-resources/speaker-resources.module').then(m => m.SpeakerResourcesModule)
  },
  {
    path: 'policies',
    loadChildren: () => import('./feature-modules/policies/policies.module').then(m => m.PoliciesModule)
  },
  {
    path: 'newsletters/:main_newsletter_id',
    component: MainNewsletterComponent
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
        path: 'newsletters',
        loadChildren: () => import('./feature-modules/main-newsletters/main-newsletters.module').then(m => m.MainNewslettersModule),
      },
      {
        path: 'communities',
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.ORGANIZER, EUserRoles.SYSTEM_ADMINISTRATOR]
        },
        loadChildren: () => import('./feature-modules/community-control-panel/community-control-panel.module').then(m => m.CommunityGroupsModule)
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
    initialNavigation: 'enabled',
    relativeLinkResolution: 'legacy'
  })],
  exports: [RouterModule],
  providers: [InitResolver]
})
export class AppRoutingModule {
}


// NAMED ROUTER OUTLETS
// p = popup
// t = tab
