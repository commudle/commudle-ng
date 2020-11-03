import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { AboutComponent } from './components/about/about.component';
import { EventsComponent } from './components/events/events.component';
import { EventResourcesComponent } from './components/event-resources/event-resources.component';
import { MembersComponent } from './components/members/members.component';
import { CommunityChannelsListComponent } from './components/community-channels-list/community-channels-list.component';


const routes: Routes = [
  {
    path: '',
    component: HomeCommunityComponent,
    resolve: {
      community: CommunityDetailsResolver
    },
    children: [
      {
        path: '',
        component: AboutComponent
      },
      {
        path: 'events',
        component: EventsComponent
      },
      {
        path: 'resources',
        component: EventResourcesComponent
      },
      {
        path: 'members',
        component: MembersComponent
      },
      {
        path: 'public-channels',
        component: CommunityChannelsListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicCommunityRoutingModule { }
