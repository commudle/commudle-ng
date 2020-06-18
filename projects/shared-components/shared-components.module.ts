import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkInProgressComponent } from './work-in-progress/work-in-progress.component';
import { UserProfileHorizontalComponent } from './user-profile-horizontal/user-profile-horizontal.component';
import { NbButtonModule, NbIconModule, NbInputModule, NbTooltipModule } from '@nebular/theme';
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
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    YouTubePlayerModule,

    // Nebular
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule,
    SharedPipesModule
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
    VideoStreamComponent
  ]
})
export class SharedComponentsModule { }
