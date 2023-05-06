import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@commudle/editor';
import { InfiniteScrollModule } from '@commudle/infinite-scroll';
import { NbButtonModule, NbIconModule, NbTooltipModule } from '@commudle/theme';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { MessageComponent } from './components/discussion/message/message.component';
import { VoteComponent } from './components/vote/vote.component';

@NgModule({
  imports: [
    CommonModule,
    InfiniteScrollModule,
    RouterModule,
    EditorModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
  ],
  declarations: [DiscussionComponent, MessageComponent, VoteComponent],
  exports: [DiscussionComponent, VoteComponent],
})
export class SharedComponentsModule {}
