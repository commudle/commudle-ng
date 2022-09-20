import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HmsBeamComponent } from '@commudle/shared-modules';
import { CheckRedirectGuard } from '@commudle/shared-services';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { PublicEventDetailsResolver } from '../../resolvers/public-event-details.resolver';
import { AttendedMembersComponent } from './components/attended-members/attended-members.component';
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
