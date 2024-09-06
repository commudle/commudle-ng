import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NbCardModule } from '@commudle/theme';

@NgModule({
  declarations: [UserDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,

    //Nebular
    NbCardModule,
  ],
})
export class DashboardModule {}
