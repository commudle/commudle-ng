import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NbDialogRef, NbDialogService, NbTagComponent, NbTagInputAddEvent, NbToastrService } from '@commudle/theme';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { JobService } from 'apps/commudle-admin/src/app/services/job.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import {
  EJobCategory,
  EJobLocationType,
  EJobSalaryCurrency,
  EJobSalaryType,
  EJobStatus,
  EJobType,
  IJob,
} from 'apps/shared-models/job.model';
import { IPageInfo } from 'apps/shared-models/page-info.model';
import { IUser } from 'apps/shared-models/user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
})
export class UserJobComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;

  jobs: IJob[] = [];
  tags: string[] = [];

  limit = 3;
  page_info: IPageInfo;
  isLoading = false;
  hiring = false;
  formSubmitLoading = false;

  jobCategories = Object.values(EJobCategory);
  jobSalaryTypes = Object.values(EJobSalaryType);
  jobSalaryCurrencies = Object.values(EJobSalaryCurrency);
  jobLocationTypes = Object.values(EJobLocationType);
  jobTypes = Object.values(EJobType);
  jobStatuses = Object.values(EJobStatus);

  job: IJob;
  jobForm;

  isEditing = false;
  dialogRef: NbDialogRef<any>;
  createJobDialog: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  @ViewChild('jobDialog', { static: true }) jobDialog: TemplateRef<any>;

  constructor(
    private authWatchService: LibAuthwatchService,
    private jobService: JobService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private userProfileMenuService: UserProfileMenuService,
    private userProfileManagerService: UserProfileManagerService,
    private route: ActivatedRoute,
  ) {
    this.jobForm = this.fb.group(
      {
        position: ['', Validators.required],
        company: ['', Validators.required],
        category: [EJobCategory.JOB, Validators.required],
        experience: [0, Validators.required],
        min_salary: [0, Validators.required],
        max_salary: [0, Validators.required],
        salary_type: [EJobSalaryType.MONTHLY, Validators.required],
        salary_currency: [EJobSalaryCurrency.INR, Validators.required],
        location_type: [EJobLocationType.REMOTE, Validators.required],
        location: [''],
        job_type: [EJobType.FULL_TIME, Validators.required],
        status: [EJobStatus.OPEN, Validators.required],
        description: [''],
        tags: [''],
      },
      {
        validators: [
          // if location_type is office, then location is required
          (fb) =>
            fb.get('location_type').value === EJobLocationType.OFFICE && !fb.get('location').value
              ? { location: true }
              : null,
          // max_salary must be greater than or equal to min_salary
          (fb) => (fb.get('max_salary').value < fb.get('min_salary').value ? { max_salary: true } : null),
        ],
      },
    );
  }

  ngOnInit(): void {
    this.route.fragment.subscribe((fragment) => {
      if (fragment === 'jobs') {
        setTimeout(() => {
          this.onOpenDialog(this.jobDialog);
        }, 500);
      }
      if (this.route.snapshot.queryParams['job_tag']) {
        this.tags.push(this.route.snapshot.queryParams['job_tag']);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    if (changes.user) {
      this.getJobs();
    }
    this.userProfileManagerService.user$.subscribe((data) => {
      this.hiring = data.is_employer;
      this.userProfileMenuService.addMenuItem('jobs', this.hiring);
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getJobs() {
    this.isLoading = true;
    this.subscriptions.push(
      this.jobService
        .getJobs({ after: this.page_info?.end_cursor, limit: this.limit, user_id: this.user.id })
        .subscribe((data) => {
          this.jobs = this.jobs.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
          this.page_info = data.page_info;
          this.isLoading = false;
          this.userProfileMenuService.addMenuItem(
            'jobs',
            this.jobs.length > 0 || this.user?.id === this.currentUser?.id || this.hiring,
          );
        }),
    );
  }

  getJob(id: number) {
    this.tags = [];
    this.subscriptions.push(
      this.jobService.getJob(id).subscribe((data) => {
        this.job = data;
        this.job.tags.forEach((tag) => this.tags.push(tag.name));
        // @ts-ignore
        this.jobForm.patchValue(this.job);
        this.jobForm.controls['tags'].setValue('');
      }),
    );
  }

  createJob() {
    this.formSubmitLoading = true;
    // @ts-ignore
    this.jobForm.controls['tags'].setValue(this.tags);
    this.subscriptions.push(
      // @ts-ignore
      this.jobService.createJob(this.jobForm.value).subscribe((data) => {
        this.nbToastrService.success('Job created successfully', 'Success');
        this.onCloseDialog();
        this.formSubmitLoading = false;
        this.jobs.unshift(data);
      }),
    );
  }

  restrictComma(event) {
    if (event.code === 'Comma') {
      event.preventDefault();
    }
  }

  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    if (value) {
      this.tags.push(value);
    }
    input.nativeElement.value = '';
  }

  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tags = this.tags.filter((tag) => tag !== tagToRemove.text);
  }

  updateJob() {
    this.formSubmitLoading = true;
    // @ts-ignore
    this.jobForm.controls['tags'].setValue(this.tags);
    this.subscriptions.push(
      // @ts-ignore
      this.jobService.updateJob(this.job.id, this.jobForm.value).subscribe((data) => {
        this.nbToastrService.success('Job updated successfully', 'Success');
        this.onCloseDialog();
        this.formSubmitLoading = true;
        this.jobs = this.jobs.map((job) => (job.id === data.id ? data : job));
      }),
    );
  }

  onDeleteJob(job_id: number) {
    this.jobs = this.jobs.filter((job) => job.id !== job_id);
  }

  onOpenDialog(templateRef: TemplateRef<any>) {
    this.dialogRef = this.nbDialogService.open(templateRef, { closeOnEsc: false, closeOnBackdropClick: false });
  }

  onOpenEditJobDialog(templateRef: TemplateRef<any>, job: IJob) {
    this.isEditing = true;
    this.getJob(job.id);
    this.onOpenDialog(templateRef);
  }

  onCloseDialog() {
    this.jobForm.patchValue({
      position: '',
      company: '',
      category: EJobCategory.JOB,
      experience: 0,
      min_salary: 0,
      max_salary: 0,
      salary_type: EJobSalaryType.MONTHLY,
      salary_currency: EJobSalaryCurrency.INR,
      location_type: EJobLocationType.REMOTE,
      location: '',
      job_type: EJobType.FULL_TIME,
      status: EJobStatus.OPEN,
      description: '',
    });
    this.dialogRef.close();
    this.isEditing = false;
  }
}
