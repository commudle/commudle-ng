import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbTabsetModule,
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';
import { JobComponent } from './components/job/job.component';
import { MyJobApplicationComponent } from './components/my-job-applications/my-job-application/my-job-application.component';
import { MyJobApplicationsComponent } from './components/my-job-applications/my-job-applications.component';
import { JobsRoutingModule } from './jobs-routing.module';
import { JobsListsComponent } from './components/jobs-lists/jobs-lists.component';
import { JobsListCardComponent } from 'projects/commudle-admin/src/app/feature-modules/jobs/components/jobs-lists/jobs-list-card/jobs-list-card.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    MyJobApplicationsComponent,
    MyJobApplicationComponent,
    JobComponent,
    JobApplicationsComponent,
    JobsListsComponent,
    JobsListCardComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    SharedComponentsModule,
    SharedPipesModule,
    MiniUserProfileModule,

    NbCardModule,
    NbListModule,
    NbTabsetModule,
    NbButtonModule,
    NbIconModule,
    NbSelectModule,
    NbAlertModule,
    NgxSliderModule,
    FormsModule,
  ],
})
export class JobsModule {}
