import { Routes, RouterModule } from '@angular/router';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';
import { HackathonControlPanelBasicFormComponent } from './components/hackathon-control-panel-basic-form/hackathon-control-panel-basic-form.component';
import { HackathonControlPanelContactDetailsFormComponent } from './components/hackathon-control-panel-contact-details-form/hackathon-control-panel-contact-details-form.component';

const routes: Routes = [
  {
    path: 'new',
    component: HackathonControlPanelBasicFormComponent,
  },
  {
    path: ':hackathon_id',
    children: [
      {
        path: '',
        component: HackathonControlPanelDashboardComponent,
        children: [
          {
            path: '',
            component: HackathonControlPanelBasicFormComponent,
          },
          {
            path: 'contact',
            component: HackathonControlPanelContactDetailsFormComponent,
          },
        ],
      },
    ],
  },
];

export const HackathonControlPanelRoutes = RouterModule.forChild(routes);
