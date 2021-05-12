import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import {UserExtraDetailsComponent} from './components/public-profile/user-extra-details/user-extra-details.component';
import {UserNetworkComponent} from './components/public-profile/user-network/user-network.component';
import {UserNetworkListComponent} from './components/public-profile/user-network/user-network-list/user-network-list.component';

const routes: Routes = [
  {
    path: ':username',
    component: PublicProfileComponent,
    children: [
      {
        path: '',
        component: UserExtraDetailsComponent
      },
      {
        path: '',
        component: UserNetworkComponent,
        children: [
          {
            path: 'followers',
            component: UserNetworkListComponent
          },
          {
            path: 'following',
            component: UserNetworkListComponent
          }
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
