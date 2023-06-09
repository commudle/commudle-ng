import { EditorModule } from '@tinymce/tinymce-angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbCardModule,
  NbButtonModule,
  NbInputModule,
  NbIconModule,
  NbTagModule,
  NbRouteTabsetModule,
  NbFormFieldModule,
  NbToggleModule,
} from '@commudle/theme';
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
import { SkeletonCardsComponent } from 'apps/commudle-admin/src/app/feature-modules/skeleton-screens/components/skeleton-cards/skeleton-cards.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { EventsComponent } from './components/communities/events/events.component';
import { ChannelsComponent } from './components/communities/channels/channels.component';
import { CommunityComponent } from './components/communities/community/community.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    CommunityGroupFormComponent,
    DashboardComponent,
    CommunitiesComponent,
    AdminTeamComponent,
    MembersListComponent,
    EventsComponent,
    ChannelsComponent,
    CommunityComponent,
  ],
  imports: [
    CommonModule,
    CommunityGroupsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    SharedComponentsModule,
    SharedDirectivesModule,
    MiniUserProfileModule,

    //standalone components
    SidebarComponent,
    SkeletonCardsComponent,

    //font-awesome
    FontAwesomeModule,

    // Nebular
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    NbIconModule,
    NbTagModule,
    NbRouteTabsetModule,
    NbFormFieldModule,
    NbToggleModule,
  ],
})
export class CommunityGroupsModule {}
