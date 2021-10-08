import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthGuard } from 'projects/shared-services/lib-authwatch.guard';
import { CommunityDetailsResolver } from '../../resolvers/community-details.resolver';
import { ChannelMembersComponent } from './components/channel-members/channel-members.component';
import { ArchiveChannelComponent } from './components/channel-settings/archive-channel/archive-channel.component';
import { ChannelSettingsComponent } from './components/channel-settings/channel-settings.component';
import { EditChannelComponent } from './components/channel-settings/edit-channel/edit-channel.component';
import { InviteFormComponent } from './components/channel-settings/invite-form/invite-form.component';
import { CommunityChannelComponent } from './components/community-channel/community-channel.component';
import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { JoinByTokenComponent } from './components/join-by-token/join-by-token.component';
import { NewCommunityChannelComponent } from './components/new-community-channel/new-community-channel.component';
import { EmailJoinComponent } from './components/email-join/email-join.component';
import { CommunityChannelsDashboardChannelListComponent } from './components/community-channels-dashboard-channel-list/community-channels-dashboard-channel-list/community-channels-dashboard-channel-list.component';

const routes = [
  {
    path: 'join/:token',
    component: JoinByTokenComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'email-join/:token',
    component: EmailJoinComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'app',
    component: CommunityChannelsDashboardComponent,
    resolve: {
      community: CommunityDetailsResolver,
    },
    children: [
      {
        path: '',
        component: CommunityChannelsDashboardChannelListComponent,
      },
      {
        path: 'new-channel',
        outlet: 'p',
        component: NewCommunityChannelComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'settings/:community_channel_id',
        outlet: 'p',
        component: ChannelSettingsComponent,
        children: [
          {
            path: 'edit',
            component: EditChannelComponent,
          },
          {
            path: 'invite',
            component: InviteFormComponent,
          },
          {
            path: 'delete',
            component: ArchiveChannelComponent,
          },
        ],
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
            canActivate: [AuthGuard],
          },
        ],
      },
    ],
  },
  {
    path: '',
    redirectTo: 'app',
    pathMatch: 'prefix',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommunityChannelsRoutingModule {}
