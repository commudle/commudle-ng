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
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss'],
})
export class JobListComponent implements OnInit, OnDestroy {
  jobs: IJob[] = [];
  currentUser: ICurrentUser;
  limit = 10;
  page_info: IPageInfo;
  isLoading = false;
  isFilterLoading: boolean = false;
  faFilters = faFilter;
  selectedFormValue;
  UrlParamsFromFilters = {};
  heading = '';

  filterForm = this.fb.group({
    category: [''],
    salary_type: [''],
    salary_currency: [''],
    location_type: [''],
    job_type: [''],
    status: [''],
    experience: [''],
    min_experience: [''],
    max_experience: [''],
    salary_range: [''],
    min_salary: [''],
    max_salary: [''],
    tags: ([] = [[]]),
  });

  experiences = [
    { value_range: { min: '0', max: '1' }, label: '0-1 Year' },
    { value_range: { min: '1', max: '2' }, label: '1-2 Year' },
    { value_range: { min: '2', max: '3' }, label: '2-3 Year' },
    { value_range: { min: '3', max: '4' }, label: '3-4 Year' },
    { value_range: { min: '4', max: '' }, label: '>4 Year' },
  ];

  salaryRange = [
    { value_range: { min: '0', max: '25000' }, label: '0 to 25,000' },
    { value_range: { min: '25001', max: '50000' }, label: '25,001 to 50,000' },
    { value_range: { min: '50001', max: '100000' }, label: '50,001 to 1,000,00' },
    { value_range: { min: '100001', max: '' }, label: 'More than 1,000,00' },
  ];

  jobCategories = Object.values(EJobCategory);
  jobSalaryTypes = Object.values(EJobSalaryType);
  jobSalaryCurrencies = Object.values(EJobSalaryCurrency);
  jobLocationTypes = Object.values(EJobLocationType);
  jobTypes = Object.values(EJobType);
  jobStatuses = Object.values(EJobStatus);

  subscriptions: Subscription[] = [];

  constructor(
    private jobService: JobService,
    private fb: FormBuilder,
    private authWatchService: LibAuthwatchService,
    private router: Router,
    private seoService: SeoService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    this.urlParamsToForm();

    // listen to changes in filter form
    this.detectFilterValueChange();

    if (this.activatedRoute.snapshot.queryParams['tags[]']) {
      this.heading = this.activatedRoute.snapshot.queryParams['tags[]'] + ' Jobs';
      this.filterForm.get('tags').value.push(this.activatedRoute.snapshot.queryParams['tags[]']);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  urlParamsToForm() {
    this.isFilterLoading = true;
    const qParams = this.activatedRoute.snapshot.queryParams;
    for (const key of Object.keys(qParams)) {
      if (this.filterForm.controls[key]) {
        if (key == 'min_experience' || key == 'max_experience') {
          this.filterForm
            .get('experience')
            .patchValue(
              `${qParams.min_experience ? qParams.min_experience : ''}-${
                qParams.max_experience ? qParams.max_experience : ''
              }`,
            );
        } else if (key == 'min_salary' || key == 'max_salary') {
          this.filterForm
            .get('salary_range')
            .patchValue(
              `${qParams.min_salary ? qParams.min_salary : ''}-${qParams.max_salary ? qParams.max_salary : ''}`,
            );
        } else {
          this.filterForm.get(key).patchValue(qParams[key]);
        }
      }
    }

    this.getJobs();
  }

  formToUrlParams() {
    this.UrlParamsFromFilters = {};
    Object.keys(this.filterForm.controls).forEach((key) => {
      if (this.filterForm.controls[key].value != '') {
        if (key != 'experience' && key != 'salary_range') {
          this.UrlParamsFromFilters[key] = this.filterForm.controls[key].value;
        }
      }
    });
    this.router.navigate([], { queryParams: { ...this.UrlParamsFromFilters } });
  }

  detectFilterValueChange() {
    this.subscriptions.push(
      this.filterForm.valueChanges.subscribe(() => {
        this.isLoading = true;
        this.page_info = null;
        this.formToUrlParams();
        this.getJobs(true);
      }),
    );
  }

  updateApiQueryParams() {
    this.selectedFormValue = {
      category: this.filterForm.value.category,
      salary_type: this.filterForm.value.salary_type,
      location_type: this.filterForm.value.location_type,
      job_type: this.filterForm.value.job_type,
      min_experience: this.filterForm.value.min_experience ? this.filterForm.value.min_experience : '',
      max_experience: this.filterForm.value.max_experience ? this.filterForm.value.max_experience : '',
      min_salary: this.filterForm.value.min_salary ? this.filterForm.value.min_salary : '',
      max_salary: this.filterForm.value.max_salary ? this.filterForm.value.max_salary : '',
      salary_currency: this.filterForm.value.salary_currency,
      tags: this.filterForm.value.tags ? this.filterForm.value.tags : [],
    };
  }

  getJobs(clear = false) {
    this.isLoading = true;
    this.updateApiQueryParams();
    this.subscriptions.push(
      this.jobService
        .getJobs({
          after: this.page_info?.end_cursor,
          limit: this.limit,
          ...this.selectedFormValue,
        })
        .subscribe((data) => {
          if (clear) {
            this.jobs = [];
          }
          this.jobs = this.jobs.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoading = false;
          this.isFilterLoading = false;
        }),
    );
    this.setMeta();
  }

  reset() {
    this.filterForm.reset();
    this.filterForm.patchValue({
      category: '',
      salary_type: '',
      salary_currency: '',
      location_type: '',
      job_type: '',
      min_experience: '',
      max_experience: '',
      min_salary: '',
      max_salary: '',
    });
    this.router.navigate([]);
    this.getJobs(true);
  }

  redirectToProfile() {
    this.router.navigate(['/users/' + this.currentUser.username], { fragment: 'jobs' });
  }

  setMeta(): void {
    this.seoService.setTags(
      'Jobs & Internships',
      'Find your next job, internship or freelancing opportunity as a software developer, designers, technical content writer, volunteer and more through professionals from the developer ecosystem.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
