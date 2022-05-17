import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NbButtonModule, NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { MiniUserProfileComponent } from './components/mini-user-profile/mini-user-profile.component';
import { UserProfileCardLargeComponent } from './components/profile-cards/user-profile-card-large/user-profile-card-large.component';
import { UserProfileCardMediumComponent } from './components/profile-cards/user-profile-card-medium/user-profile-card-medium.component';
import { UserProfileCardSmallComponent } from './components/profile-cards/user-profile-card-small/user-profile-card-small.component';
import { UserFollowComponent } from './components/user-follow/user-follow.component';
import { MiniUserProfileDirective } from './directives/mini-user-profile.directive';

@NgModule({
  declarations: [
    MiniUserProfileDirective,
    MiniUserProfileComponent,
    UserProfileCardSmallComponent,
    UserProfileCardMediumComponent,
    UserProfileCardLargeComponent,
    UserFollowComponent,
  ],
  imports: [
    CommonModule,
    SharedPipesModule,
    RouterModule,

    //Nebular
    NbCardModule,
    NbTagModule,
    NbIconModule,
    NbButtonModule,
  ],

  exports: [
    MiniUserProfileDirective,
    UserProfileCardSmallComponent,
    UserProfileCardMediumComponent,
    UserProfileCardLargeComponent,
    UserFollowComponent,
  ],
})
export class MiniUserProfileModule {}
