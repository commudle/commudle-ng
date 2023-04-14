import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbCardModule, NbButtonModule, NbInputModule, NbIconModule, NbTabsetModule } from '@commudle/theme';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommunityGroupsRoutingModule } from './community-groups-routing.module';
import { CommunityGroupFormComponent } from './components/community-group-form/community-group-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { SharedDirectivesModule } from 'apps/shared-directives/shared-directives.module';
import { SidebarComponent } from 'apps/shared-components/sidebar/sidebar.component';
import { CommunitiesComponent } from './components/communities/communities.component';
import { AdminTeamComponent } from './components/admin-team/admin-team.component';
import { MembersListComponent } from './components/members-list/members-list.component';

@NgModule({
  declarations: [
    CommunityGroupFormComponent,
    DashboardComponent,
    CommunitiesComponent,
    AdminTeamComponent,
    MembersListComponent,
  ],
  imports: [
    CommonModule,
    CommunityGroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedComponentsModule,
    SharedDirectivesModule,

    //standalone components
    SidebarComponent,

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTabsetModule,
  ],
})
export class CommunityGroupsModule {}
