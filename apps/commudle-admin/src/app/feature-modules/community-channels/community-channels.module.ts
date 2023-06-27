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
  NbAccordionModule,
  NbTabsetModule,
} from '@commudle/theme';
import { LinkyModule } from 'ngx-linky';
import { SharedComponentsModule as OldSharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MentionModule } from 'apps/shared-modules/mention/mention.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
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
import { SidebarComponent } from 'apps/shared-components/sidebar/sidebar.component';
import { CommunityForumListComponent } from 'apps/commudle-admin/src/app/feature-modules/community-channels/components/community-forum-list/community-forum-list.component';
import { CommunityForumComponent } from './components/community-forum/community-forum.component';
import { CommunityChannelsDashboardForumListComponent } from './components/community-channels-dashboard-forum-list/community-channels-dashboard-forum-list.component';
import { SharedComponentsModule } from '@commudle/shared-components';
import { CommunityFormMessageComponent } from './components/community-form-message/community-form-message.component';

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
    CommunityForumListComponent,
    CommunityForumComponent,
    CommunityChannelsDashboardForumListComponent,
    CommunityFormMessageComponent,
  ],
  imports: [
    CommonModule,
    CommunityChannelsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    OldSharedComponentsModule,
    PickerModule,
    SharedPipesModule,
    SharedDirectivesModule,
    LinkyModule,
    MentionModule,
    SharedComponentsModule, //new

    //External
    FontAwesomeModule,

    //standalone modules
    SidebarComponent,

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
    NbAccordionModule,
    NbTabsetModule,
  ],
  exports: [CommunityChannelsDashboardComponent, SendMessageFormComponent],
})
export class CommunityChannelsModule {}
