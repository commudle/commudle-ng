import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicCommunityNotificationsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/public-community-notifications/public-community-notifications.component';
import { CommunityDetailsResolver } from 'apps/commudle-admin/src/app/resolvers/community-details.resolver';
import { AboutComponent } from './components/about/about.component';
import { CommunityChannelsListComponent } from './components/community-channels-list/community-channels-list.component';
import { EventsComponent } from './components/events/events.component';
import { HomeCommunityComponent } from './components/home-community/home-community.component';
import { MembersComponent } from './components/members/members.component';
import { CustomPageComponent } from './components/custom-page/custom-page.component';
import { NewsletterComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/newsletters/newsletter/newsletter.component';
import { NewslettersComponent } from 'apps/commudle-admin/src/app/feature-modules/public-community/components/newsletters/newsletters.component';

const routes = [
  {
    path: '',
    component: HomeCommunityComponent,
    resolve: {
      community: CommunityDetailsResolver,
    },
    children: [
      {
        path: '',
        component: AboutComponent,
      },
      {
        path: 'events',
        component: EventsComponent,
      },
      // {
      //   path: 'resources',
      //   component: EventResourcesComponent,
      // },
      {
        path: 'members',
        component: MembersComponent,
      },
      {
        path: 'channels',
        component: CommunityChannelsListComponent,
      },
      {
        path: 'channels/:community_channel_id',
        component: CommunityChannelsListComponent,
      },
      {
        path: 'channels/join/:token',
        component: CommunityChannelsListComponent,
      },
      {
        path: 'forums',
        component: CommunityChannelsListComponent,
      },
      {
        path: 'forums/:community_channel_id',
        component: CommunityChannelsListComponent,
      },
      {
        path: 'forums/join/:token',
        component: CommunityChannelsListComponent,
      },
      {
        path: 'notifications',
        component: PublicCommunityNotificationsComponent,
      },
      {
        path: 'p/:page_slug',
        component: CustomPageComponent,
      },
      {
        path: 'newsletters',
        children: [
          {
            path: '',
            component: NewslettersComponent,
          },
          {
            path: ':newsletter_slug',
            component: NewsletterComponent,
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicCommunityRoutingModule {}
