import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@commudle/editor';
import { InViewportDirective } from '@commudle/in-viewport';
import { InfiniteScrollModule } from '@commudle/infinite-scroll';
import {
  NbButtonModule,
  NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbPopoverModule,
  NbTooltipModule,
} from '@commudle/theme';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { MessageComponent } from './components/discussion/message/message.component';
import { VoteComponent } from './components/vote/vote.component';
import { ChannelDiscussionComponent } from './components/channel-discussion/channel-discussion.component';
import { CommunityChannelMessageComponent } from './components/channel-discussion/community-channel-message/community-channel-message.component';
import { CommunityForumMessageComponent } from './components/channel-discussion/community-forum-message/community-forum-message.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { FaqComponent } from './components/faq/faq.component';
import { VotersComponent } from './components/vote/voters/voters.component';
@NgModule({
  declarations: [
    DiscussionComponent,
    MessageComponent,
    VoteComponent,
    ChannelDiscussionComponent,
    CommunityChannelMessageComponent,
    CommunityForumMessageComponent,
    LoadingSpinnerComponent,
    FaqComponent,
    VotersComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    RouterModule,
    EditorModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
    NbPopoverModule,
    NbCardModule,
    InViewportDirective,
    NbContextMenuModule,
    FontAwesomeModule,
  ],
  exports: [DiscussionComponent, VoteComponent, ChannelDiscussionComponent, LoadingSpinnerComponent, FaqComponent],
  providers: [InViewportDirective],
})
export class SharedComponentsModule {}
