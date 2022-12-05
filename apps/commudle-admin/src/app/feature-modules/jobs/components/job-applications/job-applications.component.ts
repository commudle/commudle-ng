import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@commudle/theme';
import { JobApplicationService } from 'apps/commudle-admin/src/app/feature-modules/jobs/services/job-application.service';
import { EJobApplicationStatus, IJobApplication } from 'apps/shared-models/job-application.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-applications',
  templateUrl: './job-applications.component.html',
  styleUrls: ['./job-applications.component.scss'],
})
export class JobApplicationsComponent implements OnInit, OnDestroy {
  job_id: number;
  jobApplications: IJobApplication[];
  page = 1;
  count = 10;
  total = 0;
  isLoading = false;

  jobApplicationStatus = EJobApplicationStatus;
  jobApplicationStatuses = Object.values(EJobApplicationStatus);

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private jobApplicationService: JobApplicationService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.parent.params.subscribe((data) => {
        this.job_id = data.id;
        this.getJobApplications();
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getJobApplications(): void {
    this.isLoading = true;
    this.subscriptions.push(
      this.jobApplicationService.getJobApplications(this.job_id, this.page, this.count).subscribe((value) => {
        this.jobApplications = value.job_applications;
        this.total = value.total;
        this.isLoading = false;
      }),
    );
  }

  updateJobApplicationStatus(jobApplication: IJobApplication, status: EJobApplicationStatus): void {
    this.jobApplicationService.updateJobApplicationStatus(jobApplication.id, status).subscribe((value) => {
      this.jobApplications = this.jobApplications.map((jobApplication) => {
        if (jobApplication.id === value.id) {
          return value;
        }
        return jobApplication;
      });
      this.nbToastrService.success('Status updated successfully', 'Success');
    });
  }
}
