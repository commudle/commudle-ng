import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AttendedMembersComponent } from 'apps/commudle-admin/src/app/feature-modules/public-events/components/attended-members/attended-members.component';
import { CommunityDetailsResolver } from 'apps/commudle-admin/src/app/resolvers/community-details.resolver';
import { PublicEventDetailsResolver } from 'apps/commudle-admin/src/app/resolvers/public-event-details.resolver';
import { HmsBeamComponent } from 'apps/shared-modules/hms-video/components/hms-beam/hms-beam.component';
import { CheckRedirectGuard } from 'apps/shared-services/check-redirect.guard';
import { HomeEventComponent } from './components/home-event/home-event.component';
import { SessionPageComponent } from './components/session-page/session-page.component';

const routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver,
      event: PublicEventDetailsResolver,
    },
    children: [
      {
        path: '',
        component: HomeEventComponent,
      },
      {
        path: 'session',
        component: SessionPageComponent,
        canDeactivate: [CheckRedirectGuard],
      },
      {
        path: 'beam',
        component: HmsBeamComponent,
      },
      {
        path: 'attended-members',
        component: AttendedMembersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicEventsRoutingModule {}
