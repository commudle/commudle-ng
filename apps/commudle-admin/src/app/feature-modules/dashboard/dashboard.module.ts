import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { UserDashboardComponent } from './components/user-dashboard/user-dashboard.component';
import { NbButtonModule, NbCardModule, NbIconModule } from '@commudle/theme';
import { UserProfileComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-profile/user-profile.component';
import { UserprofileDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/homepage/components/homepage-dashboard/userprofile-details/userprofile-details.component';
import { EventHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-horizontal-card/event-horizontal-card.component';
import { DashboardUpdatesComponent } from './components/user-dashboard/dashboard-updates/dashboard-updates.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HackathonHorizontalCardComponent } from 'apps/commudle-admin/src/app/app-shared-components/hackathon-horizontal-card/hackathon-horizontal-card.component';
import { SharedComponentsModule } from '@commudle/shared-components';
import { AppSharedComponentsModule } from 'apps/commudle-admin/src/app/app-shared-components/app-shared-components.module';

@NgModule({
  declarations: [UserDashboardComponent, DashboardUpdatesComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedComponentsModule,
    AppSharedComponentsModule,

    //Nebular
    NbCardModule,
    NbButtonModule,
    NbIconModule,

    //Fontawesome
    FontAwesomeModule,

    //Standalone
    UserProfileComponent,
    UserprofileDetailsComponent,
    EventHorizontalCardComponent,
    HackathonHorizontalCardComponent,
  ],
})
export class DashboardModule {}