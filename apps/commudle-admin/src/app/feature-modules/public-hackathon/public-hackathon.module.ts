/* eslint-disable @nx/enforce-module-boundaries */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicHackathonRoutes } from './public-hackathon.routing';
import {
  NbButtonModule,
  NbInputModule,
  NbCardModule,
  NbRouteTabsetModule,
  NbStepperModule,
  NbIconModule,
} from '@commudle/theme';
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
import { PublicHackathonDetailsMiniCardComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-details-mini-card/public-hackathon-details-mini-card.component';
import { PublicHackathonFormComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-form/public-hackathon-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicHackathonTeammateFormComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-form/public-hackathon-teammate-form/public-hackathon-teammate-form.component';
import { PublicHackathonProjectDetailsFormComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-form/public-hackathon-project-details-form/public-hackathon-project-details-form.component';
import { PublicHackathonCustomQuestionsFormComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-form/public-hackathon-custom-questions-form/public-hackathon-custom-questions-form.component';
import { MiniUserProfileModule } from 'apps/shared-modules/mini-user-profile/mini-user-profile.module';
import { UserProfileComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-profile/user-profile.component';
import { UserprofileDetailsComponent } from 'apps/commudle-admin/src/app/feature-modules/homepage/components/homepage-dashboard/userprofile-details/userprofile-details.component';
import { PublicHackathonUserDashboardComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-user-dashboard/public-hackathon-user-dashboard.component';
import { PublicHackathonRegistrationComponent } from 'apps/commudle-admin/src/app/feature-modules/public-hackathon/components/public-hackathon-registration/public-hackathon-registration.component';
import { CommunityChannelsModule } from 'apps/commudle-admin/src/app/feature-modules/community-channels/community-channels.module';
import { SharedPipesModule } from 'apps/shared-pipes/pipes.module';

@NgModule({
  imports: [
    CommonModule,
    PublicHackathonRoutes,
    FormsModule,
    ReactiveFormsModule,
    NbButtonModule,
    NbInputModule,
    NbCardModule,
    NbRouteTabsetModule,
    NbStepperModule,
    NbIconModule,
    FontAwesomeModule,
    SharedComponentsModule,
    NewSharedComponentsModule,
    MiniUserProfileModule,
    CommunityChannelsModule,
    //standalone
    UserProfileComponent,
    UserprofileDetailsComponent,
    SharedPipesModule,
  ],
  declarations: [
    PublicHackathonHomepageComponent,
    PublicHackathonDetailsComponent,
    PublicHackathonScheduleComponent,
    PublicHackathonJudgesComponent,
    PublicHackathonPrizesComponent,
    PublicHackathonProjectsComponent,
    PublicHackathonChannelsComponent,
    PublicHackathonDetailsMiniCardComponent,
    PublicHackathonFormComponent,
    PublicHackathonTeammateFormComponent,
    PublicHackathonProjectDetailsFormComponent,
    PublicHackathonCustomQuestionsFormComponent,
    PublicHackathonUserDashboardComponent,
    PublicHackathonRegistrationComponent,
  ],
})
export class PublicHackathonModule {}
