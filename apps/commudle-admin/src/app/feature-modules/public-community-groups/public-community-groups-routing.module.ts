import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityGroupAboutComponent } from './components/community-group-about/community-group-about.component';
import { CommunityGroupCommunitiesComponent } from './components/community-group-communities/community-group-communities.component';
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
        path: 'communities',
        component: CommunityGroupCommunitiesComponent,
      },
      {
        path: 'team',
        component: CommunityGroupTeamComponent,
      },
      {
        path: 'about',
        component: CommunityGroupAboutComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicCommunityGroupsRoutingModule {}
