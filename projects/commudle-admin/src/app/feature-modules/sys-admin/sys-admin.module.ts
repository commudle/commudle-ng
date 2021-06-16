import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { SysAdminComponent } from './sys-admin.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { NbCardModule, NbWindowModule, NbIconModule, NbButtonModule, NbListModule, NbSelectModule, NbSpinnerModule, NbTabsetModule } from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';
import { LabsComponent } from './components/labs/labs.component';
import { CommunityControlsComponent } from './components/community-controls/community-controls.component';


@NgModule({
  declarations: [
    SysAdminComponent,
    AdminSurveysComponent,
    CommunityBuildsComponent,
    LabsComponent,
    CommunityControlsComponent,
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
    NbTabsetModule
  ]
})
export class SysAdminModule { }
