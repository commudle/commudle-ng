import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { UserProfileHorizontalComponent } from './user-profile-horizontal/user-profile-horizontal.component';
import {
  NbButtonModule,
  NbIconModule,
  NbInputModule,
  NbTooltipModule,
  NbWindowModule,
  NbCardModule,
  NbSelectModule,
  NbCheckboxModule,
  NbRadioModule,
  NbBadgeModule} from '@nebular/theme';
import { RouterModule } from '@angular/router';
import { BadgeComponent } from './badge/badge.component';
import { DiscussionChatComponent } from './discussion-chat/discussion-chat.component';
import { UserMessageComponent } from './discussion-chat/user-message/user-message.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DiscussionQnAComponent } from './discussion-qna/discussion-qna.component';
import { QnaUserMessageComponent } from './discussion-qna/qna-user-message/qna-user-message.component';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { CommunityBadgeComponent } from './community-badge/community-badge.component';
import { VideoStreamComponent } from './video-stream/video-stream.component';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { PollsComponent } from './polls/polls.component';
import { PollCreateFormComponent } from './polls/poll-create-form/poll-create-form.component';
import { PollFormComponent } from './polls/poll-form/poll-form.component';
import { PollListItemComponent } from './polls/poll-list-item/poll-list-item.component';
import { PollResultComponent } from './polls/poll-result/poll-result.component';
import { NewDataFormComponent } from './new-data-form/new-data-form.component';
import { DataFormFillComponent } from './data-form-fill/data-form-fill.component';


@NgModule({
  declarations: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    DiscussionChatComponent,
    UserMessageComponent,
    DiscussionQnAComponent,
    QnaUserMessageComponent,
    CommunityBadgeComponent,
    VideoStreamComponent,
    PollsComponent,
    PollCreateFormComponent,
    PollFormComponent,
    PollListItemComponent,
    PollResultComponent,
    NewDataFormComponent,
    DataFormFillComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    YouTubePlayerModule,
    SharedPipesModule,

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
    NbBadgeModule
  ],
  exports: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    DiscussionChatComponent,
    UserMessageComponent,
    QnaUserMessageComponent,
    DiscussionQnAComponent,
    CommunityBadgeComponent,
    VideoStreamComponent,
    PollsComponent,
    NewDataFormComponent,
    DataFormFillComponent,
  ]
})
export class SharedComponentsModule { }
