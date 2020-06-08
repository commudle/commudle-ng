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



@NgModule({
  declarations: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    DiscussionChatComponent,
    UserMessageComponent,
    DiscussionQnAComponent,
    QnaUserMessageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

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
    DiscussionQnAComponent
  ]
})
export class SharedComponentsModule { }
