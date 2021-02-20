import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './components/users.component';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import {
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
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


@NgModule({
  declarations: [
    UsersComponent,
    PublicProfileComponent,
    UserContentComponent,
    UserCoverPhotoComponent,
    UserBasicDetailsComponent,
    UserLabCardComponent,
    UserBuildCardComponent,
    UserCommunityCardComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedPipesModule,
    FontAwesomeModule,

    // Nebular
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule,
    NbTagModule,
    NbInputModule,
    NbTabsetModule,
    NbUserModule
  ]
})
export class UsersModule {
}
