import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHackathonRoutes } from './public-hackathon.routing';
import { NbButtonModule, NbInputModule, NbCardModule, NbRouteTabsetModule } from '@commudle/theme';
import { PublicHackathonHomepageComponent } from './components/public-hackathon-homepage/public-hackathon-homepage.component';
import { SharedComponentsModule } from 'apps/shared-components/shared-components.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PublicHackathonDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-details/public-hackathon-details.component';
import { PublicHackathonScheduleComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-schedule/public-hackathon-schedule.component';
import { PublicHackathonJudgesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-judges/public-hackathon-judges.component';
import { PublicHackathonPrizesComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-prizes/public-hackathon-prizes.component';
import { PublicHackathonProjectsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-projects/public-hackathon-projects.component';
import { PublicHackathonChannelsComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-channels/public-hackathon-channels.component';
import { SharedComponentsModule as NewSharedComponentsModule } from '@commudle/shared-components';

@NgModule({
  imports: [
    CommonModule,
    PublicHackathonRoutes,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbRouteTabsetModule,
    FontAwesomeModule,

    SharedComponentsModule,
    NewSharedComponentsModule,
  ],
  declarations: [
    PublicHackathonHomepageComponent,
    PublicHackathonDetailsComponent,
    PublicHackathonScheduleComponent,
    PublicHackathonJudgesComponent,
    PublicHackathonPrizesComponent,
    PublicHackathonProjectsComponent,
    PublicHackathonChannelsComponent,
  ],
})
export class PublicHackathonModule {}
