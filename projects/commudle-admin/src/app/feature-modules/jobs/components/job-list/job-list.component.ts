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
import { faFilter } from '@fortawesome/free-solid-svg-icons';

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
  faFilters = faFilter;
  formValue;

  filterForm = this.fb.group({
    category: [''],
    salary_type: [''],
    salary_currency: [''],
    location_type: [''],
    job_type: [''],
    status: [''],
    experience: [''],
    minExperience: [''],
    maxExperience: '',
    salary_range: [''],
    minSalary: [''],
    maxSalary: [''],
  });

  experiences = [
    { minExperience: '0', maxExperience: '1', label: '0-1 Year' },
    { minExperience: '1', maxExperience: '2', label: '1-2 Year' },
    { minExperience: '2', maxExperience: '3', label: '2-3 Year' },
    { minExperience: '3', maxExperience: '4', label: '3-4 Year' },
    { minExperience: '4', maxExperience: '', label: '>4 Year' },
  ];
  salaryRange = [
    { minSalary: '0', maxSalary: '25000', label: 'Rs 0 to Rs 25,000' },
    { minSalary: '25001', maxSalary: '50000', label: 'Rs 25,001 to Rs 50,000' },
    { minSalary: '50001', maxSalary: '100000', label: 'Rs 50,001 to Rs 1 Lakh' },
    { minSalary: '100001', maxSalary: '', label: 'More than Rs 1 Lakh' },
  ];

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
        console.log(this.filterForm.value);
        this.formValue = {
          category: this.filterForm.value.category,
          salary_type: this.filterForm.value.salary_type,
          location_type: this.filterForm.value.location_type,
          job_type: this.filterForm.value.job_type,
          minExperience: this.filterForm.value.experience ? this.filterForm.value.experience.min : '',
          maxExperience: this.filterForm.value.experience ? this.filterForm.value.experience.max : '',
          minSalary: this.filterForm.value.salary_range ? this.filterForm.value.salary_range.min : '',
          maxSalary: this.filterForm.value.salary_range ? this.filterForm.value.salary_range.max : '',
        };
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
          ...this.formValue,
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
  reset() {
    this.filterForm.reset();
    this.formValue = {
      category: [''],
      salary_type: [''],
      location_type: [''],
      job_type: [''],
      minExperience: [''],
      maxExperience: '',
      minSalary: [''],
      maxSalary: [''],
    };
    this.getJobs();
  }
}
