import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './components/users.component';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import {
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbTooltipModule,
  NbUserModule
} from '@nebular/theme';
import {SharedPipesModule} from 'projects/shared-pipes/pipes.module';
import {UserContentComponent} from './components/public-profile/user-content/user-content.component';
import {UserCoverPhotoComponent} from './components/public-profile/user-cover-photo/user-cover-photo.component';
import {UserBasicDetailsComponent} from './components/public-profile/user-basic-details/user-basic-details.component';
import {UserLabCardComponent} from './components/public-profile/user-content/user-lab-card/user-lab-card.component';
import {UserBuildCardComponent} from './components/public-profile/user-content/user-build-card/user-build-card.component';
import {UserCommunityCardComponent} from './components/public-profile/user-content/user-community-card/user-community-card.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BasicUserProfileComponent} from 'projects/commudle-admin/src/app/feature-modules/users/components/public-profile/user-basic-details/basic-user-profile/basic-user-profile.component';
import {ReactiveFormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    UsersComponent,
    PublicProfileComponent,
    UserContentComponent,
    UserCoverPhotoComponent,
    UserBasicDetailsComponent,
    UserLabCardComponent,
    UserBuildCardComponent,
    UserCommunityCardComponent,
    BasicUserProfileComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedPipesModule,
    FontAwesomeModule,
    ReactiveFormsModule,

    // Nebular
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbTagModule,
    NbInputModule,
    NbTabsetModule,
    NbUserModule,
    NbFormFieldModule,
    NbSpinnerModule,
    NbRadioModule
  ],
  exports: [
    BasicUserProfileComponent
  ]
})
export class UsersModule {
}
