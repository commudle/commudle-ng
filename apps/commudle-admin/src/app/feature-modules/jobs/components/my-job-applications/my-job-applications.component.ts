import { Component, OnDestroy, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { JobApplicationService } from 'apps/commudle-admin/src/app/feature-modules/jobs/services/job-application.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { EJobApplicationStatus, IJobApplication } from 'apps/shared-models/job-application.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-my-job-applications',
  templateUrl: './my-job-applications.component.html',
  styleUrls: ['./my-job-applications.component.scss'],
})
export class MyJobApplicationsComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;

  jobApplications: IJobApplication[] = [];
  isLoading = false;
  jobApplicationGroups: _.Dictionary<IJobApplication[]>;

  jobApplicationStatuses: string[] = Object.values(EJobApplicationStatus);

  subscriptions: Subscription[] = [];

  constructor(private authWatchService: LibAuthwatchService, private jobApplicationService: JobApplicationService) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
        if (this.currentUser?.id) {
          this.getMyJobApplications();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getMyJobApplications() {
    this.subscriptions.push(
      this.jobApplicationService.getMyJobApplications().subscribe((data) => {
        this.jobApplications = data.job_applications;
        // this.jobApplicationGroups = _.groupBy(data.job_applications, 'status');
        // add status 'all' to the job application statuses
        // this.jobApplicationStatuses.unshift('all');
        // add all job applications to the group
        // this.jobApplicationGroups['all'] = data.job_applications;
        this.isLoading = false;
      }),
    );
  }
}
