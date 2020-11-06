import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityChannelFormComponent } from './components/community-channel-form/community-channel-form.component';
import { CommunityChannelResolver } from './resolvers/community-channel.resolver';
import { CommunityChannelDiscussionComponent } from './components/community-channel-discussion/community-channel-discussion.component';


const routes: Routes = [
  {
    path: '',
    component: CommunityChannelsDashboardComponent,
    children: [
      {
        path: 'new-channel',
        component: CommunityChannelFormComponent
      },
      {
        path: ':community_channel_id',
        component: CommunityChannelDiscussionComponent,
        resolve: {
          // community: CommunityChannelResolver
        },
        children: [
          {
            path: 'new-channel',
            component: CommunityChannelFormComponent
          },
          {
            path: 'edit',
            component: CommunityChannelFormComponent
          }
        ]
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityChannelsRoutingModule { }
