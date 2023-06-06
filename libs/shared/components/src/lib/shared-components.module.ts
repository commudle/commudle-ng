import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@commudle/editor';
import { InViewportDirective } from '@commudle/in-viewport';
import { InfiniteScrollModule } from '@commudle/infinite-scroll';
import { NbButtonModule, NbIconModule, NbTooltipModule } from '@commudle/theme';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { MessageComponent } from './components/discussion/message/message.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UserComponent } from './components/user/user.component';
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
    InViewportDirective,
  ],
  declarations: [
    DiscussionComponent,
    MessageComponent,
    SpinnerComponent,
    VoteComponent,
    UserComponent,
    SpinnerComponent,
  ],
  exports: [DiscussionComponent, SpinnerComponent, VoteComponent, UserComponent],
  providers: [InViewportDirective],
})
export class SharedComponentsModule {}
