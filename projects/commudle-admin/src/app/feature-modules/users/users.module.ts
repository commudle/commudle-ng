import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { NbButtonModule, NbCardModule, NbIconModule, NbTooltipModule } from '@nebular/theme';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { UserContentComponent } from './components/public-profile/user-content/user-content.component';
import { UserCoverPhotoComponent } from './components/public-profile/user-cover-photo/user-cover-photo.component';
import { UserBasicDetailsComponent } from './components/public-profile/user-basic-details/user-basic-details.component';


@NgModule({
  declarations: [
    UsersComponent,
    PublicProfileComponent,
    UserContentComponent,
    UserCoverPhotoComponent,
    UserBasicDetailsComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedPipesModule,

    // Nebular
    NbCardModule,
    NbIconModule,
    NbButtonModule,
    NbTooltipModule
  ]
})
export class UsersModule { }
