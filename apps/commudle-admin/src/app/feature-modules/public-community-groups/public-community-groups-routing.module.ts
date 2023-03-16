import { CommunityGroupChannelsComponent } from './components/community-group-channels/community-group-channels.component';
import { CommunityGroupEventsComponent } from './components/community-group-events/community-group-events.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityGroupAboutComponent } from './components/community-group-about/community-group-about.component';
import { CommunityGroupCommunitiesComponent } from './components/community-group-communities/community-group-communities.component';
import { CommunityGroupActivityComponent } from './components/community-group-activity/community-group-activity.component';
import { CommunityGroupHomeComponent } from './components/community-group-home/community-group-home.component';
import { CommunityGroupTeamComponent } from './components/community-group-team/community-group-team.component';
import { CommunityGroupDetailsResolver } from './resolvers/community-group-details.resolver';

const routes = [
  {
    path: ':community_group_id',
    component: CommunityGroupHomeComponent,
    resolve: {
      community_group: CommunityGroupDetailsResolver,
    },
    children: [
      {
        path: '',
        component: CommunityGroupCommunitiesComponent,
      },
      {
        path: 'activity',
        component: CommunityGroupActivityComponent,
      },
      {
        path: 'about',
        component: CommunityGroupAboutComponent,
      },
      {
        path: 'communities',
        component: CommunityGroupCommunitiesComponent,
      },
      {
        path: 'events',
        component: CommunityGroupEventsComponent,
      },
      {
        path: 'channels',
        component: CommunityGroupChannelsComponent,
      },
      {
        path: 'team',
        component: CommunityGroupTeamComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicCommunityGroupsRoutingModule {}
