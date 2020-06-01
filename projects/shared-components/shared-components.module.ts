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



@NgModule({
  declarations: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    DiscussionChatComponent,
    UserMessageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,

    // Nebular
    NbButtonModule,
    NbIconModule,
    NbInputModule,
    NbTooltipModule
  ],
  exports: [
    WorkInProgressComponent,
    UserProfileHorizontalComponent,
    BadgeComponent,
    DiscussionChatComponent,
    UserMessageComponent
  ]
})
export class SharedComponentsModule { }
