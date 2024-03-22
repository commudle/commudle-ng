import { Routes, RouterModule } from '@angular/router';
import { PublicHackathonHomepageComponent } from './components/public-hackathon-homepage/public-hackathon-homepage.component';
import { CommunityDetailsResolver } from 'apps/commudle-admin/src/app/resolvers/community-details.resolver';
import { HackathonDetailsResolver } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/resolver/hackathon-details.resolver';
import { PublicHackathonDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-details/public-hackathon-details.component';
import { PublicHackathonScheduleComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-schedule/public-hackathon-schedule.component';
import { PublicHackathonJudgesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-judges/public-hackathon-judges.component';
import { PublicHackathonPrizesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-prizes/public-hackathon-prizes.component';
import { PublicHackathonProjectsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-projects/public-hackathon-projects.component';
import { PublicHackathonChannelsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-channels/public-hackathon-channels.component';
import { PublicHackathonFormComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-form/public-hackathon-form.component';
import { PublicHackathonUserDashboardComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-user-dashboard/public-hackathon-user-dashboard.component';

const routes: Routes = [
  {
    path: '',
    resolve: {
      community: CommunityDetailsResolver,
      hackathon: HackathonDetailsResolver,
    },
    children: [
      {
        path: '',
        component: PublicHackathonHomepageComponent,
        children: [
          {
            path: '',
            component: PublicHackathonDetailsComponent,
          },
          {
            path: 'schedule',
            component: PublicHackathonScheduleComponent,
          },
          {
            path: 'judges',
            component: PublicHackathonJudgesComponent,
          },
          {
            path: 'prizes',
            component: PublicHackathonPrizesComponent,
          },
          {
            path: 'projects',
            component: PublicHackathonProjectsComponent,
          },
          {
            path: 'channels',
            component: PublicHackathonChannelsComponent,
          },
          {
            path: 'dashboard',
            component: PublicHackathonUserDashboardComponent,
          },
        ],
      },
      {
        path: 'fill-form/:hackathon_response_group_id',
        component: PublicHackathonFormComponent,
      },
    ],
  },
];

export const PublicHackathonRoutes = RouterModule.forChild(routes);
