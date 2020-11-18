import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityChannelFormComponent } from './components/community-channel-form/community-channel-form.component';
import { CommunityChannelResolver } from './resolvers/community-channel.resolver';
import { CommunityChannelDiscussionComponent } from './components/community-channel-discussion/community-channel-discussion.component';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { ChannelSettingsComponent } from './components/community-channel-list/channel-settings/channel-settings.component';


const routes: Routes = [
  {
    path: '',
    component: CommunityChannelsDashboardComponent,
    pathMatch: 'full',
    resolve: {
      community: CommunityDetailsResolver
    },
    children: [
      {
        path: 'new-channel',
        outlet: 'popup',
        component: CommunityChannelFormComponent,
      },
      {
        path: ':community_channel_id',
        component: CommunityChannelDiscussionComponent,
        resolve: {
          // community: CommunityChannelResolver
        },
        children: [
          {
            path: 'edit',
            component: CommunityChannelFormComponent
          },
          {
            path: 'settings',
            component: ChannelSettingsComponent
          }
        ]
      },
    ],
  },
  // {
  //   path: 'new-channel',
  //     component: CommunityChannelFormComponent,
  //     outlet: 'popup'
  // },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityChannelsRoutingModule { }
