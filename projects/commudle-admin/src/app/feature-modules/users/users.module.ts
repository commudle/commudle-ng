import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {UsersRoutingModule} from './users-routing.module';
import {UsersComponent} from './components/users.component';
import {PublicProfileComponent} from './components/public-profile/public-profile.component';
import {
  NbActionsModule,
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
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
import {UserLabCardComponent} from './components/public-profile/user-content/user-contributions/user-lab-card/user-lab-card.component';
import {UserBuildCardComponent} from './components/public-profile/user-content/user-contributions/user-build-card/user-build-card.component';
import {UserCommunityCardComponent} from './components/public-profile/user-content/user-contributions/user-community-card/user-community-card.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {BasicUserProfileComponent} from './components/public-profile/user-basic-details/basic-user-profile/basic-user-profile.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UserContributionsComponent} from './components/public-profile/user-content/user-contributions/user-contributions.component';
import {UserSocialComponent} from './components/public-profile/user-content/user-social/user-social.component';
import {UserSocialCardComponent} from './components/public-profile/user-content/user-social/user-social-card/user-social-card.component';
import {SharedComponentsModule} from 'projects/shared-components/shared-components.module';
import {UserPastEventCardComponent} from './components/public-profile/user-content/user-contributions/user-past-event-card/user-past-event-card.component';
import {UserFeedComponent} from './components/public-profile/user-content/user-feed/user-feed.component';
import {UserFeedInputComponent} from './components/public-profile/user-content/user-feed/user-feed-input/user-feed-input.component';
import {UserFeedPostsComponent} from './components/public-profile/user-content/user-feed/user-feed-posts/user-feed-posts.component';
import {UserFeedPostComponent} from './components/public-profile/user-content/user-feed/user-feed-posts/user-feed-post/user-feed-post.component';
import {DragDropModule} from '@angular/cdk/drag-drop';


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
    BasicUserProfileComponent,
    UserPastEventCardComponent,
    UserContributionsComponent,
    UserSocialComponent,
    UserSocialCardComponent,
    UserFeedComponent,
    UserFeedInputComponent,
    UserFeedPostsComponent,
    UserFeedPostComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedPipesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    DragDropModule,

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
    NbRadioModule,
    NbActionsModule,
    NbListModule,
    NbAlertModule,
  ],
  exports: [
    BasicUserProfileComponent
  ]
})
export class UsersModule {
}
