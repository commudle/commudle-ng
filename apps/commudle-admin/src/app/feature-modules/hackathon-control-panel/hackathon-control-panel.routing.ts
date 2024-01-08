import { Routes, RouterModule } from '@angular/router';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: HackathonControlPanelDashboardComponent,
  },
];

export const HackathonControlPanelRoutes = RouterModule.forChild(routes);
