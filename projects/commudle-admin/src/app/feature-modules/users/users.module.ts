import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
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
  NbRouteTabsetModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbTooltipModule,
  NbUserModule
} from '@nebular/theme';
import { UserFollowComponent } from 'projects/commudle-admin/src/app/feature-modules/user-follow/user-follow.component';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { BasicUserProfileComponent } from './components/public-profile/user-basic-details/basic-user-profile/basic-user-profile.component';
import { UserBasicDetailsComponent } from './components/public-profile/user-basic-details/user-basic-details.component';
import { UserBasicSocialComponent } from './components/public-profile/user-basic-social/user-basic-social.component';
import { UserBadgesComponent } from './components/public-profile/user-extra-details/user-badges/user-badges.component';
import { UserContentComponent } from './components/public-profile/user-extra-details/user-content/user-content.component';
import { UserBuildCardComponent } from './components/public-profile/user-extra-details/user-content/user-contributions/user-build-card/user-build-card.component';
import { UserCommunityCardComponent } from './components/public-profile/user-extra-details/user-content/user-contributions/user-community-card/user-community-card.component';
import { UserContributionsComponent } from './components/public-profile/user-extra-details/user-content/user-contributions/user-contributions.component';
import { UserLabCardComponent } from './components/public-profile/user-extra-details/user-content/user-contributions/user-lab-card/user-lab-card.component';
import { UserPastEventCardComponent } from './components/public-profile/user-extra-details/user-content/user-contributions/user-past-event-card/user-past-event-card.component';
import { UserFeedInputComponent } from './components/public-profile/user-extra-details/user-content/user-feed/user-feed-input/user-feed-input.component';
import { UserFeedPostComponent } from './components/public-profile/user-extra-details/user-content/user-feed/user-feed-posts/user-feed-post/user-feed-post.component';
import { UserFeedPostsComponent } from './components/public-profile/user-extra-details/user-content/user-feed/user-feed-posts/user-feed-posts.component';
import { UserFeedComponent } from './components/public-profile/user-extra-details/user-content/user-feed/user-feed.component';
import { UserSocialCardComponent } from './components/public-profile/user-extra-details/user-content/user-social/user-social-card/user-social-card.component';
import { UserSocialComponent } from './components/public-profile/user-extra-details/user-content/user-social/user-social.component';
import { UserCoverPhotoComponent } from './components/public-profile/user-extra-details/user-cover-photo/user-cover-photo.component';
import { UserExtraDetailsComponent } from './components/public-profile/user-extra-details/user-extra-details.component';
import { UserNetworkListComponent } from './components/public-profile/user-network/user-network-list/user-network-list.component';
import { UserNetworkComponent } from './components/public-profile/user-network/user-network.component';
import { UsersRoutingModule } from './users-routing.module';


@NgModule({
  declarations: [
    PublicProfileComponent,
    UserContentComponent,
    UserCoverPhotoComponent,
    UserBasicDetailsComponent,
    UserExtraDetailsComponent,
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
    UserNetworkComponent,
    UserNetworkListComponent,
    UserFollowComponent,
    UserBadgesComponent,
    UserBasicSocialComponent
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
    NbRouteTabsetModule
  ],
  exports: [
    BasicUserProfileComponent,
    UserFollowComponent
  ]
})
export class UsersModule {
}
