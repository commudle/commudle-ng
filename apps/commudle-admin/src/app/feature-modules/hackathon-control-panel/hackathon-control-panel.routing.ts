import { Routes, RouterModule } from '@angular/router';
import { HackathonControlPanelDashboardComponent } from './components/hackathon-control-panel-dashboard/hackathon-control-panel-dashboard.component';
import { HackathonControlPanelBasicFormComponent } from './components/hackathon-control-panel-basic-form/hackathon-control-panel-basic-form.component';
import { HackathonControlPanelContactDetailsFormComponent } from './components/hackathon-control-panel-contact-details-form/hackathon-control-panel-contact-details-form.component';
import { HackathonControlPanelDatesFormComponent } from './components/hackathon-control-panel-dates-form/hackathon-control-panel-dates-form.component';
import { HackathonControlPanelSponsorComponent } from './components/hackathon-control-panel-sponsor/hackathon-control-panel-sponsor.component';
import { HackathonControlPanelTracksPrizesComponent } from './components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-tracks-prizes.component';
import { HackathonControlPanelTrackComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-track/hackathon-control-panel-track.component';
import { HackathonControlPanelPrizeComponent } from 'apps/commudle-admin/src/app/feature-modules/hackathon-control-panel/components/hackathon-control-panel-tracks-prizes/hackathon-control-panel-prize/hackathon-control-panel-prize.component';

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
          {
            path: 'dates',
            component: HackathonControlPanelDatesFormComponent,
          },
          {
            path: 'sponsors',
            component: HackathonControlPanelSponsorComponent,
          },
          {
            path: 'tracks',
            component: HackathonControlPanelTracksPrizesComponent,
            children: [
              {
                path: '',
                component: HackathonControlPanelTrackComponent,
              },
              {
                path: 'prizes',
                component: HackathonControlPanelPrizeComponent,
              },
            ],
          },
        ],
      },
    ],
  },
];

export const HackathonControlPanelRoutes = RouterModule.forChild(routes);
