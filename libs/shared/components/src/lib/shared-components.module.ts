import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NgxDatatableModule } from '@commudle/ngx-datatable';
import { SharedDirectivesModule } from '@commudle/shared-directives';
import { HmsVideoModule, MentionModule, MiniUserProfileModule, SharedModulesModule } from "@commudle/shared-modules";
import { SharedPipesModule } from '@commudle/shared-pipes';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbAccordionModule,
  NbActionsModule,
  NbAlertModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbRadioModule,
  NbSelectModule,
  NbTagModule,
  NbTooltipModule,
  NbWindowModule,
} from '@nebular/theme';
import { LinkyModule } from 'ngx-linky';
import { BadgeComponent } from './badge/badge.component';
import { CommunityBadgeComponent } from './community-badge/community-badge.component';
import { CookieConsentComponent } from './cookie-consent/cookie-consent.component';
import { DataFormFillComponent } from './data-form-fill/data-form-fill.component';
import { DiscussionPersonalChatComponent } from './discussion-personal-chat/discussion-personal-chat.component';
import { UserPersonalChatMessageComponent } from './discussion-personal-chat/user-personal-chat-message/user-personal-chat-message.component';
import { FlagsDisplayComponent } from './flags-display/flags-display.component';
import { FormResponsesComponent } from './form-responses/form-responses.component';
import { ResponsesTableComponent } from './form-responses/responses-table/responses-table.component';
import { UserDetailsCellComponent } from './form-responses/responses-table/user-details-cell/user-details-cell.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { MessageComponent } from './messages/messages-list/message/message.component';
import { MessagesListComponent } from './messages/messages-list/messages-list.component';
import { MessagesComponent } from './messages/messages.component';
import { NewDataFormComponent } from './new-data-form/new-data-form.component';
import { PaginationComponent } from './pagination/pagination.component';
import { PollResultComponent } from './poll-result/poll-result.component';
import { PollCreateFormComponent } from './polls/poll-create-form/poll-create-form.component';
import { PollFormComponent } from './polls/poll-form/poll-form.component';
import { PollListItemComponent } from './polls/poll-list-item/poll-list-item.component';
import { PollsComponent } from './polls/polls.component';
import { QnaListItemComponent } from './qna/qna-list/qna-list-item/qna-list-item.component';
import { QnaListComponent } from './qna/qna-list/qna-list.component';
import { QnaComponent } from './qna/qna.component';
import { ShareButtonComponent } from './share-button/share-button.component';
import { TagComponent } from './tag/tag.component';
import { UserLiveStatusComponent } from './user-live-status/user-live-status.component';
import { UserObjectVisitPixelComponent } from './user-object-visit-pixel/user-object-visit-pixel.component';
import { UserProfileHorizontalComponent } from './user-profile-horizontal/user-profile-horizontal.component';
import { UserProfileMiniComponent } from './user-profile-mini/user-profile-mini.component';
import { UserVisitTrackerComponent } from './user-visit-tracker/user-visit-tracker.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { VotersComponent } from './votes-display/voters/voters.component';
import { VotesDisplayComponent } from './votes-display/votes-display.component';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';

@NgModule({
  declarations: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    CommunityBadgeComponent,
    VideoStreamComponent,
    PollsComponent,
    PollCreateFormComponent,
    PollFormComponent,
    PollListItemComponent,
    PollResultComponent,
    NewDataFormComponent,
    DataFormFillComponent,
    UserVisitTrackerComponent,
    FormResponsesComponent,
    ResponsesTableComponent,
    UserDetailsCellComponent,
    VotesDisplayComponent,
    VotersComponent,
    UserObjectVisitPixelComponent,
    DiscussionPersonalChatComponent,
    UserPersonalChatMessageComponent,
    CookieConsentComponent,
    UserProfileMiniComponent,
    UserLiveStatusComponent,
    TagComponent,
    FlagsDisplayComponent,
    MessagesComponent,
    MessagesListComponent,
    MessageComponent,
    QnaComponent,
    QnaListComponent,
    QnaListItemComponent,
    ShareButtonComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    PickerModule,
    LinkyModule,
    NgxDatatableModule,
    SharedPipesModule,
    SharedDirectivesModule,
    SharedModulesModule,
    HmsVideoModule,

    // Nebular
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule,
    NbWindowModule,
    NbCardModule,
    NbSelectModule,
    NbCheckboxModule,
    NbRadioModule,
    NbBadgeModule,
    NbAccordionModule,
    NbPopoverModule,
    NbListModule,
    NbAlertModule,
    NbTagModule,
    NbActionsModule,
    NbFormFieldModule,

    FontAwesomeModule,
    MiniUserProfileModule,
    MentionModule,
  ],
  exports: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    CommunityBadgeComponent,
    VideoStreamComponent,
    PollsComponent,
    PollResultComponent,
    NewDataFormComponent,
    DataFormFillComponent,
    UserVisitTrackerComponent,
    FormResponsesComponent,
    VotesDisplayComponent,
    UserObjectVisitPixelComponent,
    DiscussionPersonalChatComponent,
    CookieConsentComponent,
    UserProfileMiniComponent,
    UserLiveStatusComponent,
    TagComponent,
    FlagsDisplayComponent,
    MessagesComponent,
    QnaComponent,
    ShareButtonComponent,
    PaginationComponent,
    LoadingSpinnerComponent,
  ],
})
export class SharedComponentsModule {}
