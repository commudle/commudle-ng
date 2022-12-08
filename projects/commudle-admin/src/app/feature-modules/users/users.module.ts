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
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbTagModule,
  NbToggleModule,
  NbTooltipModule,
  NbUserModule,
} from '@nebular/theme';
import { UserProfileMenuService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { BasicInfoComponent } from './components/public-profile/user-basic-details/basic-user-profile/basic-info/basic-info.component';
import { BasicUserProfileComponent } from './components/public-profile/user-basic-details/basic-user-profile/basic-user-profile.component';
import { SocialLinksComponent } from './components/public-profile/user-basic-details/basic-user-profile/social-links/social-links.component';
import { UsernameComponent } from './components/public-profile/user-basic-details/basic-user-profile/username/username.component';
import { EditUserProfileComponent } from './components/public-profile/user-basic-details/edit-user-profile/edit-user-profile.component';
import { EmailPreferencesComponent } from './components/public-profile/user-basic-details/email-preferences/email-preferences.component';
import { UserBasicDetailsComponent } from './components/public-profile/user-basic-details/user-basic-details.component';
import { UserBasicSocialComponent } from './components/public-profile/user-basic-social/user-basic-social.component';
import { UserBadgesComponent } from './components/public-profile/user-extra-details/user-badges/user-badges.component';
import { UserBuildCardComponent } from './components/public-profile/user-extra-details/user-contributions/user-build-card/user-build-card.component';
import { UserCommunityCardComponent } from './components/public-profile/user-extra-details/user-contributions/user-community-card/user-community-card.component';
import { UserContributionsComponent } from './components/public-profile/user-extra-details/user-contributions/user-contributions.component';
import { UserLabCardComponent } from './components/public-profile/user-extra-details/user-contributions/user-lab-card/user-lab-card.component';
import { UserPastEventCardComponent } from './components/public-profile/user-extra-details/user-contributions/user-past-event-card/user-past-event-card.component';
import { UserCoverPhotoComponent } from './components/public-profile/user-extra-details/user-cover-photo/user-cover-photo.component';
import { UserExtraDetailsComponent } from './components/public-profile/user-extra-details/user-extra-details.component';
import { UserFeedInputComponent } from './components/public-profile/user-extra-details/user-feed/user-feed-input/user-feed-input.component';
import { UserFeedPostComponent } from './components/public-profile/user-extra-details/user-feed/user-feed-posts/user-feed-post/user-feed-post.component';
import { UserFeedPostsComponent } from './components/public-profile/user-extra-details/user-feed/user-feed-posts/user-feed-posts.component';
import { UserFeedComponent } from './components/public-profile/user-extra-details/user-feed/user-feed.component';
import { UserJobCardComponent } from './components/public-profile/user-extra-details/user-job/user-job-card/user-job-card.component';
import { UserJobComponent } from './components/public-profile/user-extra-details/user-job/user-job.component';
import { UserResumeCardComponent } from './components/public-profile/user-extra-details/user-resume/user-resume-card/user-resume-card.component';
import { UserResumePreviewComponent } from './components/public-profile/user-extra-details/user-resume/user-resume-preview/user-resume-preview.component';
import { UserResumeComponent } from './components/public-profile/user-extra-details/user-resume/user-resume.component';
import { UserSocialCardComponent } from './components/public-profile/user-extra-details/user-social/user-social-card/user-social-card.component';
import { UserSocialComponent } from './components/public-profile/user-extra-details/user-social/user-social.component';
import { UserWorkHistoryCardComponent } from './components/public-profile/user-extra-details/user-work-history/user-work-history-card/user-work-history-card.component';
import { UserWorkHistoryComponent } from './components/public-profile/user-extra-details/user-work-history/user-work-history.component';
import { UserNetworkListComponent } from './components/public-profile/user-network/user-network-list/user-network-list.component';
import { UserNetworkComponent } from './components/public-profile/user-network/user-network.component';
import { CapitalizeAndRemoveUnderscorePipe } from './pipes/capitalize-and-remove-underscore.pipe';
import { UsersRoutingModule } from './users-routing.module';

@NgModule({
  declarations: [
    PublicProfileComponent,
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
    UserBadgesComponent,
    UserBasicSocialComponent,
    EditUserProfileComponent,
    EmailPreferencesComponent,
    CapitalizeAndRemoveUnderscorePipe,
    UsernameComponent,
    BasicInfoComponent,
    SocialLinksComponent,
    UserWorkHistoryComponent,
    UserWorkHistoryCardComponent,
    UserResumeComponent,
    UserResumeCardComponent,
    UserResumePreviewComponent,
    UserJobComponent,
    UserJobCardComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedPipesModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
    SharedDirectivesModule,
    MiniUserProfileModule,
    SharedComponentsModule,

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
    NbRouteTabsetModule,
    NbToggleModule,
    NbSelectModule,
  ],
  exports: [
    BasicUserProfileComponent,
    UsernameComponent,
    BasicInfoComponent,
    SocialLinksComponent,
    CapitalizeAndRemoveUnderscorePipe,
  ],
  providers: [UserProfileMenuService],
})
export class UsersModule {}
