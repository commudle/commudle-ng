import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {
  NbButtonGroupModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbContextMenuModule,
  NbDialogModule,
  NbFormFieldModule,
  NbIconModule,
  NbInputModule,
  NbRouteTabsetModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'projects/shared-directives/shared-directives.module';
import { CommunityControlPanelRoutingModule } from './community-control-panel-routing.module';
import { CommunityBlockedUsersComponent } from './components/community-blocked-users/community-blocked-users.component';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityCreateComponent } from './components/community-create/community-create.component';
import { CommunityEditDetailsComponent } from './components/community-edit-details/community-edit-details.component';
import { CommunityEventsListActionsComponent } from './components/community-events-list/community-events-list-actions/community-events-list-actions.component';
import { CommunityEventsListDateComponent } from './components/community-events-list/community-events-list-date/community-events-list-date.component';
import { CommunityEventsListComponent } from './components/community-events-list/community-events-list.component';
import { CommunityFormsListActionsComponent } from './components/community-forms-list/community-forms-list-actions/community-forms-list-actions.component';
import { CommunityFormsListStatsComponent } from './components/community-forms-list/community-forms-list-stats/community-forms-list-stats.component';
import { CommunityFormsListComponent } from './components/community-forms-list/community-forms-list.component';
import { CommunityMembersListComponent } from './components/community-members-list/community-members-list.component';
import { CommunityMembersComponent } from './components/community-members/community-members.component';
import { CommunityStatsComponent } from './components/community-stats/community-stats.component';
import { CommunityTeamComponent } from './components/community-team/community-team.component';

@NgModule({
  declarations: [
    CommunityControlPanelComponent,
    CommunityCreateComponent,
    CommunityEditDetailsComponent,
    CommunityEventsListComponent,
    CommunityEventsListActionsComponent,
    CommunityEventsListDateComponent,
    CommunityFormsListComponent,
    CommunityFormsListActionsComponent,
    CommunityFormsListStatsComponent,
    CommunityStatsComponent,
    CommunityTeamComponent,
    CommunityMembersComponent,
    CommunityBlockedUsersComponent,
    CommunityMembersListComponent,
  ],
  imports: [
    CommonModule,
    CommunityControlPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedComponentsModule,
    Ng2SmartTableModule,
    FontAwesomeModule,
    SharedDirectivesModule,

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    NbSelectModule,
    NbFormFieldModule,
    NbDialogModule.forChild(),
    NbButtonGroupModule,
    NbContextMenuModule,
    NbCheckboxModule,
  ],
  entryComponents: [
    CommunityFormsListStatsComponent,
    CommunityFormsListActionsComponent,
    // EmailerComponent
  ],
})
export class CommunityGroupsModule {}
