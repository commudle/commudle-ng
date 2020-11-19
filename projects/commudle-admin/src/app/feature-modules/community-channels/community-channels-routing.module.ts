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
    path: 'app',
    component: CommunityChannelsDashboardComponent,
    resolve: {
      community: CommunityDetailsResolver
    },
    children: [
      {
        path: 'new-channel',
        outlet: 'p',
        component: CommunityChannelFormComponent,
      },
      {
        path: 'settings/:community_channel_id',
        outlet: 'p',
        component: ChannelSettingsComponent
      },
      {
        path: ':community_channel_id',
        component: CommunityChannelDiscussionComponent,
        resolve: {
          // community: CommunityChannelResolver
        }
      },
    ],
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'full'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityChannelsRoutingModule { }
