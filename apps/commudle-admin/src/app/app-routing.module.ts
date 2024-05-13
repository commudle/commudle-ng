import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Error404PageComponent, LibErrorHandlerComponent } from 'apps/lib-error-handler/src/public-api';
import { EUserRoles } from 'apps/shared-models/enums/user_roles.enum';
import { AuthGuard } from 'apps/shared-services/lib-authwatch.guard';
import { AboutComponent } from './components/about/about.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { SpeakerResourceFormComponent } from './components/speaker-resource-form/speaker-resource-form.component';
import { MainNewsletterComponent } from './feature-modules/main-newsletters/components/main-newsletter/main-newsletter.component';
import { RedirectToMyProfileGuard } from './feature-modules/users/guards/redirect-to-my-profile.guard';
import { InitResolver } from './resolvers/init.resolver';
import { CheckFillDataFormComponent } from './components/fill-data-form/check-fill-data-form/check-fill-data-form.component';

const routes: Routes = [
  // TODO: discuss in future for order of paths
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'signup',
    component: LoginComponent,
  },
  {
    path: 'notifications',
    loadChildren: () =>
      import('./feature-modules/notifications/notifications.module').then((m) => m.NotificationsModule),
  },
  {
    path: 'events',
    loadChildren: () =>
      import('./feature-modules/listing-pages/public-home-list-events/public-home-list-events.module').then(
        (m) => m.PublicHomeListEventsModule,
      ),
  },
  {
    path: 'speakers',
    loadChildren: () =>
      import('./feature-modules/listing-pages/public-home-list-speakers/public-home-list-speakers.module').then(
        (m) => m.PublicHomeListSpeakersModule,
      ),
  },
  {
    path: 'newsletters',
    loadChildren: () =>
      import('./feature-modules/public-newsletters/public-newsletters.module').then((m) => m.PublicNewslettersModule),
  },
  {
    path: 'newsletters/:main_newsletter_id',
    component: MainNewsletterComponent,
  },
  {
    path: '',
    loadChildren: () => import('./feature-modules/homepage/homepage.module').then((m) => m.HomepageModule),
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'student-non-profit-community-support',
    loadChildren: () =>
      import('./feature-modules/student-non-profit-support/student-non-profit-support.module').then(
        (m) => m.StudentNonProfitSupportModule,
      ),
  },
  {
    path: 'experts-program',
    loadChildren: () =>
      import('./feature-modules/expert-program/expert-program.module').then((m) => m.ExpertProgramModule),
  },
  {
    path: 'devrel-agencies',
    loadChildren: () =>
      import('./feature-modules/public-agencies/public-agencies.module').then((m) => m.PublicAgenciesModule),
  },
  {
    path: 'developer-ecosystem-blueprint',
    loadChildren: () =>
      import('./feature-modules/public-book-page/public-book-page.module').then((m) => m.PublicBookPageModule),
  },
  {
    path: 'developer-ecosystem-blueprint/book',
    loadChildren: () =>
      import('./feature-modules/public-reading-book/public-reading-book.module').then((m) => m.PublicReadingBookModule),
  },
  {
    path: 'case-study',
    loadChildren: () => import('./feature-modules/case-study/case-study.module').then((m) => m.CaseStudyModule),
  },
  // {
  //   path: 'features',
  //   component: FeaturesComponent,
  // },
  {
    path: 'users',
    loadChildren: () => import('./feature-modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'me',
    loadChildren: () => import('./feature-modules/users/users.module').then((m) => m.UsersModule),
  },
  {
    path: 'communities',
    component: CommunitiesComponent,
  },
  {
    path: 'my-profile',
    canActivate: [AuthGuard, RedirectToMyProfileGuard],
    pathMatch: 'full',
    children: [],
  },
  {
    path: 'communities/:community_id',
    loadChildren: () =>
      import('./feature-modules/public-community/public-community.module').then((m) => m.PublicCommunityModule),
  },
  {
    path: 'communities/:community_id/events/:event_id',
    loadChildren: () =>
      import('./feature-modules/public-events/public-events.module').then((m) => m.PublicEventsModule),
  },
  {
    path: 'communities/:community_id/hackathons/:hackathon_id',
    loadChildren: () =>
      import('./feature-modules/public-hackathon/public-hackathon.module').then((m) => m.PublicHackathonModule),
  },
  {
    path: 'communities/:community_id/channels',
    loadChildren: () =>
      import('./feature-modules/community-channels/community-channels.module').then((m) => m.CommunityChannelsModule),
  },
  {
    path: 'orgs',
    loadChildren: () =>
      import('./feature-modules/public-community-groups/public-community-groups.module').then(
        (m) => m.PublicCommunityGroupsModule,
      ),
  },
  {
    path: 'fill-form/:data_form_entity_id',
    component: CheckFillDataFormComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-confirmations',
    loadChildren: () =>
      import('./feature-modules/email-confirmations/email-confirmations.module').then(
        (m) => m.EmailConfirmationsModule,
      ),
  },
  {
    path: 'speaker-resource-form',
    canActivate: [AuthGuard],
    component: SpeakerResourceFormComponent,
  },
  {
    path: 'forms',
    loadChildren: () => import('./feature-modules/data-forms/data-forms.module').then((m) => m.DataFormsModule),
  },
  {
    path: 'sys-admin',
    loadChildren: () => import('./feature-modules/sys-admin/sys-admin.module').then((m) => m.SysAdminModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'builds',
    loadChildren: () =>
      import('./feature-modules/community-builds/community-builds.module').then((m) => m.CommunityBuildsModule),
  },
  {
    path: 'feed',
    loadChildren: () =>
      import('./feature-modules/external-feed/external-feed.module').then((m) => m.ExternalFeedModule),
  },
  {
    path: 'labs',
    loadChildren: () => import('./feature-modules/labs/labs.module').then((m) => m.LabsModule),
  },
  {
    path: 'jobs',
    loadChildren: () => import('./feature-modules/jobs/jobs.module').then((m) => m.JobsModule),
  },
  {
    path: 'pricing',
    loadChildren: () => import('./feature-modules/pricing/pricing.module').then((m) => m.PricingModule),
  },
  {
    path: 'speaker-resources',
    loadChildren: () =>
      import('./feature-modules/speaker-resources/speaker-resources.module').then((m) => m.SpeakerResourcesModule),
  },
  {
    path: 'policies',
    loadChildren: () => import('./feature-modules/policies/policies.module').then((m) => m.PoliciesModule),
  },
  {
    path: 'blogs',
    loadChildren: () => import('./feature-modules/public-blogs/public-blogs.module').then((m) => m.PublicBlogsModule),
  },
  {
    path: 'search',
    loadChildren: () => import('./feature-modules/search/search.module').then((m) => m.SearchModule),
  },
  {
    path: 'exa-drive',
    loadChildren: () => import('./feature-modules/exa-drive/exa-drive.module').then((m) => m.ExaDriveModule),
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
        loadChildren: () =>
          import('./feature-modules/main-newsletters/main-newsletters.module').then((m) => m.MainNewslettersModule),
      },
      {
        path: 'communities/:community_id/hackathon-dashboard',
        loadChildren: () =>
          import('./feature-modules/hackathon-control-panel/hackathon-control-panel.module').then(
            (m) => m.HackathonControlPanelModule,
          ),
      },
      {
        path: 'communities',
        canActivate: [AuthGuard],
        data: {
          expectedRoles: [EUserRoles.ORGANIZER, EUserRoles.SYSTEM_ADMINISTRATOR],
        },
        loadChildren: () =>
          import('./feature-modules/community-control-panel/community-control-panel.module').then(
            (m) => m.CommunityGroupsModule,
          ),
      },
      {
        path: 'forms',
        loadChildren: () => import('./feature-modules/data-forms/data-forms.module').then((m) => m.DataFormsModule),
      },
      {
        path: 'communities/:community_id/event-dashboard',
        loadChildren: () => import('./feature-modules/events/events.module').then((m) => m.EventsModule),
      },
      {
        path: 'orgs',
        loadChildren: () =>
          import('./feature-modules/community-groups/community-groups.module').then((m) => m.CommunityGroupsModule),
      },
    ],
  },
  { path: 'logout', component: LogoutComponent },
  { path: 'error', component: LibErrorHandlerComponent },
  { path: '404', component: Error404PageComponent },
  { path: '**', component: Error404PageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // TODO: modify the below to use the new option
      relativeLinkResolution: 'legacy',
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled',
      scrollOffset: [0, 68],
    }),
  ],
  exports: [RouterModule],
  providers: [InitResolver, RedirectToMyProfileGuard],
})
export class AppRoutingModule {}

// NAMED ROUTER OUTLETS
// p = popup
// t = tab
