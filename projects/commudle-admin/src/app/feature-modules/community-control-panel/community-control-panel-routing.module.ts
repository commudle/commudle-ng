import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { CommunityBlockedUsersComponent } from './components/community-blocked-users/community-blocked-users.component';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityCreateComponent } from './components/community-create/community-create.component';
import { CommunityEditDetailsComponent } from './components/community-edit-details/community-edit-details.component';
import { CommunityEventsListComponent } from './components/community-events-list/community-events-list.component';
import { CommunityFormsListComponent } from './components/community-forms-list/community-forms-list.component';
import { CommunityMembersComponent } from './components/community-members/community-members.component';
import { CommunityStatsComponent } from './components/community-stats/community-stats.component';
import { CommunityTeamComponent } from './components/community-team/community-team.component';

const routes = [
  {
    path: 'new',
    component: CommunityCreateComponent,
  },
  {
    path: ':community_id/stats',
    component: CommunityStatsComponent,
    resolve: {
      community: CommunityDetailsResolver,
    },
  },
  {
    path: ':community_id',
    component: CommunityControlPanelComponent,

    children: [
      {
        path: '',
        component: CommunityEventsListComponent,
      },
      {
        path: 'forms',
        component: CommunityFormsListComponent,
      },
      {
        path: 'edit',
        component: CommunityEditDetailsComponent,
      },
      {
        path: 'members',
        component: CommunityMembersComponent,
      },
      {
        path: 'team',
        component: CommunityTeamComponent,
      },
      {
        path: 'blocked-users',
        component: CommunityBlockedUsersComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityControlPanelRoutingModule {}
