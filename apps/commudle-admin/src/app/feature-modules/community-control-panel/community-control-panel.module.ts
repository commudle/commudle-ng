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
  NbBadgeModule,
  NbTagModule,
  NbToggleModule,
  NbSpinnerModule,
  NbTooltipModule,
} from '@commudle/theme';
import { EditorModule } from '@tinymce/tinymce-angular';
import { Angular2SmartTableModule } from 'angular2-smart-table';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { CommunityControlPanelRoutingModule } from './community-control-panel-routing.module';
import { CommunityBlockedUsersComponent } from './components/community-blocked-users/community-blocked-users.component';
import { CommunityControlPanelComponent } from './components/community-control-panel/community-control-panel.component';
import { CommunityCreateComponent } from './components/community-create/community-create.component';
import { CommunityEditDetailsComponent } from './components/community-edit-details/community-edit-details.component';
import { CommunityEventsListActionsComponent } from './components/community-events-list/community-events-list-actions/community-events-list-actions.component';
import { CommunityEventsListDateComponent } from './components/community-events-list/community-events-list-date/community-events-list-date.component';
import { CommunityEventsListComponent } from './components/community-events-list/community-events-list.component';
import { CommunityFormsListActionsComponent } from './components/community-forms-and-surveys/community-forms-list/community-forms-list-actions/community-forms-list-actions.component';
import { CommunityFormsListStatsComponent } from './components/community-forms-and-surveys/community-forms-list/community-forms-list-stats/community-forms-list-stats.component';
import { CommunityFormsListComponent } from './components/community-forms-and-surveys/community-forms-list/community-forms-list.component';
import { CommunityMembersListComponent } from './components/community-members-list/community-members-list.component';
import { CommunityMembersComponent } from './components/community-members/community-members.component';
import { CommunityStatsComponent } from './components/community-stats/community-stats.component';
import { CommunityTeamComponent } from './components/community-team/community-team.component';
import { CommunityAdminNotificationsComponent } from './components/community-admin-notifications/community-admin-notifications.component';
import { NotificationsModule } from 'apps/commudle-admin/src/app/feature-modules/notifications/notifications.module';
import { NbEvaIconsModule } from '@commudle/eva-icons';
import { CommunityEventsListPublicPageComponent } from './components/community-events-list/community-events-list-public-page/community-events-list-public-page.component';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';
import { EventsModule } from 'apps/commudle-admin/src/app/feature-modules/events/events.module';
import { CommunityFormsAndSurveysComponent } from './components/community-forms-and-surveys/community-forms-and-surveys.component';
import { CommunitySurveysComponent } from './components/community-forms-and-surveys/community-surveys/community-surveys.component';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';
import { CommunityPaymentsComponent } from './components/community-payments/community-payments.component';

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
    CommunityAdminNotificationsComponent,
    CommunityEventsListPublicPageComponent,
    CommunityFormsAndSurveysComponent,
    CommunitySurveysComponent,
    CommunityPaymentsComponent,
  ],
  imports: [
    CommonModule,
    CommunityControlPanelRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedComponentsModule,
    Angular2SmartTableModule,
    FontAwesomeModule,
    SharedDirectivesModule,
    MiniUserProfileModule,
    SharedPipesModule,
    EventsModule,
    AppSharedComponentsModule,
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
    NotificationsModule,
    NbEvaIconsModule,
    NbBadgeModule,
    NbTagModule,
    NbToggleModule,
    NbSpinnerModule,
    NbTooltipModule,
  ],
})
export class CommunityGroupsModule {}
