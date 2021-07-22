import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { UserContributionsComponent } from './components/public-profile/user-extra-details/user-content/user-contributions/user-contributions.component';
import { UserFeedComponent } from './components/public-profile/user-extra-details/user-content/user-feed/user-feed.component';
import { UserSocialComponent } from './components/public-profile/user-extra-details/user-content/user-social/user-social.component';
import { UserExtraDetailsComponent } from './components/public-profile/user-extra-details/user-extra-details.component';
import { UserNetworkListComponent } from './components/public-profile/user-network/user-network-list/user-network-list.component';
import { UserNetworkComponent } from './components/public-profile/user-network/user-network.component';

const routes = [
  {
    path: ':username',
    component: PublicProfileComponent,
    children: [
      {
        path: '',
        component: UserExtraDetailsComponent,
        children: [
          {
            path: '',
            redirectTo: 'contributions',
            pathMatch: 'full'
          },
          {
            path: 'contributions',
            component: UserContributionsComponent
          },
          {
            path: 'social',
            component: UserSocialComponent
          },
          {
            path: 'feed',
            component: UserFeedComponent
          }
        ]
      },
      {
        path: '',
        component: UserNetworkComponent,
        children: [
          {
            path: 'followers',
            component: UserNetworkListComponent,
          },
          {
            path: 'following',
            component: UserNetworkListComponent,
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
export class UsersRoutingModule {
}
