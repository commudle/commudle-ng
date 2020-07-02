import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SysAdminRoutingModule } from './sys-admin-routing.module';
import { SysAdminComponent } from './sys-admin.component';
import { AdminSurveysComponent } from './components/admin-surveys/admin-surveys.component';
import { NbCardModule, NbWindowModule } from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';


@NgModule({
  declarations: [
    SysAdminComponent,
    AdminSurveysComponent,
  ],
  imports: [
    CommonModule,
    SysAdminRoutingModule,
    SharedComponentsModule,



    // Nebular
    NbCardModule,
    NbWindowModule,
  ]
})
export class SysAdminModule { }
