import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommunityChannelFormComponent } from './components/community-channel-form/community-channel-form.component';
import { CommunityChannelResolver } from './resolvers/community-channel.resolver';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { ChannelSettingsComponent } from './components/channel-settings/channel-settings.component';
import { EditChannelComponent } from './components/channel-settings/edit-channel/edit-channel.component';
import { CommunityChannelComponent } from './components/community-channel/community-channel.component';
import { InviteFormComponent } from './components/channel-settings/invite-form/invite-form.component';
import { JoinByTokenComponent } from './components/join-by-token/join-by-token.component';
import { ChannelMembersComponent } from './components/channel-members/channel-members.component';
import { NewCommunityChannelComponent } from './components/new-community-channel/new-community-channel.component';
import { ArchiveChannelComponent } from './components/channel-settings/archive-channel/archive-channel.component';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';


const routes: Routes = [
  {
    path: 'join/:token',
    component: JoinByTokenComponent,
    canActivate: [AuthGuard]
  },
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
        component: NewCommunityChannelComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'settings/:community_channel_id',
        outlet: 'p',
        component: ChannelSettingsComponent,
        children: [
          {
            path: 'edit',
            component: EditChannelComponent
          },
          {
            path: 'invite',
            component: InviteFormComponent
          },
          {
            path: 'delete',
            component: ArchiveChannelComponent
          }
        ]
      },
      {
        path: ':community_channel_id',
        component: CommunityChannelComponent,
        resolve: {
          // community: CommunityChannelResolver
        },
        children: [
          {
            path: 'members',
            component: ChannelMembersComponent,
            canActivate: [AuthGuard]
          }
        ]
      },
    ],
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'prefix'
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommunityChannelsRoutingModule { }
