import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { CommunityChannelsRoutingModule } from './community-channels-routing.module';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CommunityChannelFormComponent } from './components/community-channel-form/community-channel-form.component';
import { CommunityChannelListComponent } from './components/community-channel-list/community-channel-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbButtonModule,
  NbCardModule,
  NbDialogModule,
  NbIconModule,
  NbInputModule,
  NbCheckboxModule,
  NbFormFieldModule,
  NbActionsModule,
  NbListModule,
  NbContextMenuModule,
  NbTooltipModule,
  NbBadgeModule,
  NbSpinnerModule,
  NbPopoverModule,
} from '@nebular/theme';
import { ChannelSettingsComponent } from './components/channel-settings/channel-settings.component';
import { EditChannelComponent } from './components/channel-settings/edit-channel/edit-channel.component';
import { DiscussionCommunityChannelComponent } from './components/discussion-community-channel/discussion-community-channel.component';
import { CommunityChannelMessageComponent } from './components/discussion-community-channel/community-channel-message/community-channel-message.component';
import { CommunityChannelComponent } from './components/community-channel/community-channel.component';
import { SendMessageFormComponent } from './components/discussion-community-channel/send-message-form/send-message-form.component';
import { InviteFormComponent } from './components/channel-settings/invite-form/invite-form.component';
import { JoinByTokenComponent } from './components/join-by-token/join-by-token.component';
import { ChannelMembersComponent } from './components/channel-members/channel-members.component';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { MemberComponent } from './components/channel-members/member/member.component';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
// import { MentionModule } from 'angular-mentions';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { NewCommunityChannelComponent } from './components/new-community-channel/new-community-channel.component';
import { ArchiveChannelComponent } from './components/channel-settings/archive-channel/archive-channel.component';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { EmailJoinComponent } from './components/email-join/email-join.component';
import { LinkyModule } from 'ngx-linky';
import { MentionModule } from 'projects/shared-modules/mention/mention.module';

@NgModule({
  declarations: [
    CommunityChannelsDashboardComponent,
    CommunityListComponent,
    CommunityChannelFormComponent,
    CommunityChannelListComponent,
    ChannelSettingsComponent,
    EditChannelComponent,
    DiscussionCommunityChannelComponent,
    CommunityChannelMessageComponent,
    CommunityChannelComponent,
    SendMessageFormComponent,
    InviteFormComponent,
    JoinByTokenComponent,
    ChannelMembersComponent,
    MemberComponent,
    NewCommunityChannelComponent,
    ArchiveChannelComponent,
    EmailJoinComponent,
  ],
  imports: [
    CommonModule,
    CommunityChannelsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    PickerModule,
    // MentionModule,
    SharedPipesModule,
    SharedDirectivesModule,
    LinkyModule,
    MentionModule,

    // nebular
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
    NbFormFieldModule,
    NbActionsModule,
    NbListModule,
    NbContextMenuModule,
    NbTooltipModule,
    NbBadgeModule,
    NbSpinnerModule,
    NbPopoverModule,
  ],
  exports: [CommunityChannelsDashboardComponent],
})
export class CommunityChannelsModule {}
