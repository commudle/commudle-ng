import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PickerModule } from '@ctrl/ngx-emoji-mart';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbActionsModule,
  NbBadgeModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbPopoverModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@nebular/theme';
import { LinkyModule } from 'ngx-linky';
import { SharedComponentsModule } from '@commudle/shared-components';
import { SharedDirectivesModule } from '@commudle/shared-directives';
import { MentionModule } from '@commudle/shared-modules';
import { SharedPipesModule } from '@commudle/shared-pipes';
import { CommunityChannelsRoutingModule } from './community-channels-routing.module';
import { ChannelMembersComponent } from './components/channel-members/channel-members.component';
import { MemberComponent } from './components/channel-members/member/member.component';
import { ArchiveChannelComponent } from './components/channel-settings/archive-channel/archive-channel.component';
import { ChannelSettingsComponent } from './components/channel-settings/channel-settings.component';
import { EditChannelComponent } from './components/channel-settings/edit-channel/edit-channel.component';
import { InviteFormComponent } from './components/channel-settings/invite-form/invite-form.component';
import { CommunityChannelFormComponent } from './components/community-channel-form/community-channel-form.component';
import { CommunityChannelListComponent } from './components/community-channel-list/community-channel-list.component';
import { CommunityChannelComponent } from './components/community-channel/community-channel.component';
import { CommunityChannelsDashboardChannelListComponent } from './components/community-channels-dashboard-channel-list/community-channels-dashboard-channel-list.component';
import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CommunityChannelMessageComponent } from './components/discussion-community-channel/community-channel-message/community-channel-message.component';
import { DiscussionCommunityChannelComponent } from './components/discussion-community-channel/discussion-community-channel.component';
import { SendMessageFormComponent } from './components/discussion-community-channel/send-message-form/send-message-form.component';
import { EmailJoinComponent } from './components/email-join/email-join.component';
import { JoinByTokenComponent } from './components/join-by-token/join-by-token.component';
import { NewCommunityChannelComponent } from './components/new-community-channel/new-community-channel.component';

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
    CommunityChannelsDashboardChannelListComponent,
  ],
  imports: [
    CommonModule,
    CommunityChannelsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    SharedComponentsModule,
    PickerModule,
    SharedPipesModule,
    SharedDirectivesModule,
    LinkyModule,
    MentionModule,

    //External
    FontAwesomeModule,

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
