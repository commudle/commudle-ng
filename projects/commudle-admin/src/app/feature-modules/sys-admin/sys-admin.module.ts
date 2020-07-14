import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { SysAdminComponent } from './sys-admin.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { NbCardModule, NbWindowModule, NbIconModule, NbButtonModule, NbListModule, NbSelectModule } from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { CommunityBuildsComponent } from './components/community-builds/community-builds.component';


@NgModule({
  declarations: [
    SysAdminComponent,
    AdminSurveysComponent,
    CommunityBuildsComponent,
  ],
  imports: [
    CommonModule,
    SysAdminRoutingModule,
    SharedComponentsModule,



    // Nebular
    NbCardModule,
    NbWindowModule,
    NbIconModule,
    NbButtonModule,
    NbListModule,
    NbSelectModule
  ]
})
export class SysAdminModule { }
