import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BasicUserProfileComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-basic-details/basic-user-profile/basic-user-profile.component';
import { EditUserProfileComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-basic-details/edit-user-profile/edit-user-profile.component';
import { EmailPreferencesComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-basic-details/email-preferences/email-preferences.component';
import { UserExtraDetailsComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-extra-details.component';
import { UserResumePreviewComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-extra-details/user-work-history/user-resume-preview/user-resume-preview.component';
import { UserNetworkListComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-network/user-network-list/user-network-list.component';
import { UserNetworkComponent } from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-network/user-network.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';

const routes = [
  {
    path: ':username',
    component: PublicProfileComponent,
    children: [
      {
        path: 'settings',
        outlet: 'p',
        component: EditUserProfileComponent,
        children: [
          {
            path: 'basic-details',
            component: BasicUserProfileComponent,
          },
          {
            path: 'email-preferences',
            component: EmailPreferencesComponent,
          },
        ],
      },
      {
        path: 'resume/:uuid',
        outlet: 'p',
        component: UserResumePreviewComponent,
      },
      {
        path: '',
        component: UserExtraDetailsComponent,
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
      { path: '**', redirectTo: '' },
    ],
  },
  { path: '', redirectTo: '/', pathMatch: 'prefix' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
