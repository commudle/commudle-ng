import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NbAutocompleteModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbInputModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
  NbToggleModule,
  NbWindowModule,
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { AdminFeaturedCommunitiesComponent } from './components/admin-featured-communities/admin-featured-communities.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';
import { LabsComponent } from './components/labs/labs.component';
import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { SysAdminComponent } from './sys-admin.component';

@NgModule({
  declarations: [
    SysAdminComponent,
    AdminSurveysComponent,
    CommunityBuildsComponent,
    LabsComponent,
    CommunityControlsComponent,
    AdminFeaturedCommunitiesComponent,
  ],
  imports: [
    CommonModule,
    SysAdminRoutingModule,
    SharedComponentsModule,
    NbSpinnerModule,

    // Nebular
    NbCardModule,
    NbWindowModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule,
    NbTabsetModule,
    NbToggleModule,
    NbInputModule,
    NbAutocompleteModule,
    FormsModule,
  ],
})
export class SysAdminModule {}
