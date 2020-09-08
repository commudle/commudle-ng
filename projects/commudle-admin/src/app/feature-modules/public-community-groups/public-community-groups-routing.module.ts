import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityGroupHomeComponent } from './components/community-group-home/community-group-home.component';
import { CommunityGroupCommunitiesComponent } from './components/community-group-communities/community-group-communities.component';
import { CommunityGroupTeamComponent } from './components/community-group-team/community-group-team.component';

const routes: Routes = [
  {
    path: ':community_group_id',
    component: CommunityGroupHomeComponent,
    children: [
      {
        path: '',
        component: CommunityGroupCommunitiesComponent
      },
      {
        path: 'communities',
        component: CommunityGroupCommunitiesComponent
      },
      {
        path: 'team',
        component: CommunityGroupTeamComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicCommunityGroupsRoutingModule { }
