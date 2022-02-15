import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MiniUserProfileDirective } from './directives/mini-user-profile.directive';
import { MiniUserProfileComponent } from './components/mini-user-profile/mini-user-profile.component';
import { NbCardModule, NbIconModule, NbTagModule } from '@nebular/theme';
import { UserProfileCardSmallComponent } from './components/profile-cards/user-profile-card-small/user-profile-card-small.component';
import { UserProfileCardMediumComponent } from './components/profile-cards/user-profile-card-medium/user-profile-card-medium.component';
import { UserProfileCardLargeComponent } from './components/profile-cards/user-profile-card-large/user-profile-card-large.component';
import { UserFollowComponent } from './components/user-follow/user-follow.component';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { RouterModule } from '@angular/router';

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
