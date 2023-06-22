import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { EditorModule } from '@commudle/editor';
import { InViewportDirective } from '@commudle/in-viewport';
import { InfiniteScrollModule } from '@commudle/infinite-scroll';
import { NbButtonModule, NbContextMenuModule, NbIconModule, NbTooltipModule } from '@commudle/theme';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { MessageComponent } from './components/discussion/message/message.component';
import { VoteComponent } from './components/vote/vote.component';
import { ChannelDiscussionComponent } from './components/channel-discussion/channel-discussion.component';
import { CommunityChannelMessageComponent } from 'libs/shared/components/src/lib/components/channel-discussion/community-channel-message/community-channel-message.component';

@NgModule({
  declarations: [
    DiscussionComponent,
    MessageComponent,
    VoteComponent,
    ChannelDiscussionComponent,
    CommunityChannelMessageComponent,
  ],
  imports: [
    CommonModule,
    InfiniteScrollModule,
    RouterModule,
    EditorModule,
    NbIconModule,
    NbTooltipModule,
    NbButtonModule,
    InViewportDirective,
    NbContextMenuModule,
  ],
  exports: [DiscussionComponent, VoteComponent, ChannelDiscussionComponent],
  providers: [InViewportDirective],
})
export class SharedComponentsModule {}
