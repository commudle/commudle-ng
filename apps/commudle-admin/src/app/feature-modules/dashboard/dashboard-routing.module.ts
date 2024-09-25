import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventHackathonRegistrationsComponent } from 'apps/commudle-admin/src/app/app-shared-components/event-hackathon-registrations/event-hackathon-registrations.component';
import { UserDashboardComponent } from 'apps/commudle-admin/src/app/feature-modules/dashboard/components/user-dashboard/user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
  },
  {
    path: 'registrations',
    component: EventHackathonRegistrationsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
