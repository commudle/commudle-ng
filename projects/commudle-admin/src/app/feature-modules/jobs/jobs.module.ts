import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbButtonModule,
  NbCardModule,
  NbIconModule,
  NbListModule,
  NbSelectModule,
  NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import { SharedComponentsModule } from 'projects/shared-components/shared-components.module';
import { MiniUserProfileModule } from 'projects/shared-modules/mini-user-profile/mini-user-profile.module';
import { SharedPipesModule } from 'projects/shared-pipes/pipes.module';
import { JobApplicationsComponent } from './components/job-applications/job-applications.component';
import { JobListCardComponent } from './components/job-list/job-list-card/job-list-card.component';
import { JobListComponent } from './components/job-list/job-list.component';
import { JobComponent } from './components/job/job.component';
import { MyJobApplicationComponent } from './components/my-job-applications/my-job-application/my-job-application.component';
import { MyJobApplicationsComponent } from './components/my-job-applications/my-job-applications.component';
import { JobsRoutingModule } from './jobs-routing.module';

@NgModule({
  declarations: [
    MyJobApplicationsComponent,
    MyJobApplicationComponent,
    JobComponent,
    JobApplicationsComponent,
    JobListComponent,
    JobListCardComponent,
  ],
  imports: [
    CommonModule,
    JobsRoutingModule,
    FormsModule,
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
    ReactiveFormsModule,
    NbSpinnerModule,
  ],
})
export class JobsModule {}
