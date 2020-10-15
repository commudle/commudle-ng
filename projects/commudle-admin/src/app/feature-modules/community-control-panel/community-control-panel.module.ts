import { Ng2SmartTableModule } from 'ng2-smart-table';
import { CommunityControlPanelRoutingModule } from './community-control-panel-routing.module';
import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbTabsetModule, NbRouteTabsetModule, NbSelectModule } from '@nebular/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityCreateComponent } from './components/community-create/community-create.component';
import { CommunityEditDetailsComponent } from './components/community-edit-details/community-edit-details.component';
import { CommunityEventsListComponent } from './components/community-events-list/community-events-list.component';
import { CommunityEventsListActionsComponent } from './components/community-events-list/community-events-list-actions/community-events-list-actions.component';
import { CommunityEventsListDateComponent } from './components/community-events-list/community-events-list-date/community-events-list-date.component';
import { CommunityFormsListComponent } from './components/community-forms-list/community-forms-list.component';
import { CommunityFormsListActionsComponent } from './components/community-forms-list/community-forms-list-actions/community-forms-list-actions.component';
import { CommunityFormsListStatsComponent } from './components/community-forms-list/community-forms-list-stats/community-forms-list-stats.component';
import { CommunityStatsComponent } from './components/community-stats/community-stats.component';
import { CommunityTeamComponent } from './components/community-team/community-team.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


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
    CommunityTeamComponent
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

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
    NbRouteTabsetModule,
    NbTabsetModule,
    NbSelectModule,


  ],
  entryComponents: [
    CommunityFormsListStatsComponent,
    CommunityFormsListActionsComponent,
    // EmailerComponent
  ]
})
export class CommunityGroupsModule { }
