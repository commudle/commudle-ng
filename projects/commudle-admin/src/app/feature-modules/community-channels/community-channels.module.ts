import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityChannelsDashboardComponent } from './components/community-channels-dashboard/community-channels-dashboard.component';
import { CommunityChannelsRoutingModule } from './community-channels-routing.module';
import { CommunityListComponent } from './components/community-list/community-list.component';
import { CommunityChannelFormComponent } from './components/community-channel-form/community-channel-form.component';
import { CommunityChannelListComponent } from './components/community-channel-list/community-channel-list.component';
import { CommunityChannelDiscussionComponent } from './components/community-channel-discussion/community-channel-discussion.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDialogModule, NbIconModule, NbInputModule, NbWindowModule, NbCheckboxModule } from '@nebular/theme';



@NgModule({
  declarations: [
    CommunityChannelsDashboardComponent,
    CommunityListComponent,
    CommunityChannelFormComponent,
    CommunityChannelListComponent,
    CommunityChannelDiscussionComponent
  ],
  imports: [
    CommonModule,
    CommunityChannelsRoutingModule,
    ReactiveFormsModule,
    FormsModule,

    // nebular
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbCardModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
  ],
  exports: [
    CommunityChannelsDashboardComponent
  ]
})
export class CommunityChannelsModule { }
