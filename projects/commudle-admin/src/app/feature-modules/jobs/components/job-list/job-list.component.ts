import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { JobService } from 'projects/commudle-admin/src/app/services/job.service';
import {
  EJobCategory,
  EJobLocationType,
  EJobSalaryCurrency,
  EJobSalaryType,
  EJobStatus,
  EJobType,
  IJob,
} from 'projects/shared-models/job.model';
import { IPageInfo } from 'projects/shared-models/page-info.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, OnDestroy {
  jobs: IJob[] = [];
  limit = 10;
  page_info: IPageInfo;
  isLoading = false;

  filterForm = this.fb.group({
    category: [''],
    salary_type: [''],
    salary_currency: [''],
    location_type: [''],
    job_type: [''],
    status: [''],
  });
  jobCategories = Object.values(EJobCategory);
  jobSalaryTypes = Object.values(EJobSalaryType);
  jobSalaryCurrencies = Object.values(EJobSalaryCurrency);
  jobLocationTypes = Object.values(EJobLocationType);
  jobTypes = Object.values(EJobType);
  jobStatuses = Object.values(EJobStatus);

  subscriptions: Subscription[] = [];

  constructor(private jobService: JobService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.getJobs();

    // listen to changes in filter form
    this.subscriptions.push(
      this.filterForm.valueChanges.subscribe(() => {
        this.page_info = null;
        this.getJobs(true);
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getJobs(clear = false) {
    this.isLoading = true;
    this.subscriptions.push(
      this.jobService
        .getJobs({
          after: this.page_info?.end_cursor,
          limit: this.limit,
          ...this.filterForm.value,
        })
        .subscribe((data) => {
          if (clear) {
            this.jobs = [];
          }
          this.jobs = this.jobs.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoading = false;
        }),
    );
  }
}
