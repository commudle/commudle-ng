import { Component, Input, OnChanges, OnDestroy, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { UserProfileMenuService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { JobService } from 'projects/commudle-admin/src/app/services/job.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import {
  EJobCategory,
  EJobLocationType,
  EJobSalaryCurrency,
  EJobSalaryType,
  EJobStatus,
  EJobType,
  IJob,
} from 'projects/shared-models/job.model';
import { IUser } from 'projects/shared-models/user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-job',
  templateUrl: './user-job.component.html',
  styleUrls: ['./user-job.component.scss'],
})
export class UserJobComponent implements OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;

  jobs: IJob[] = [];
  page = 1;
  count = 3;
  total = -1;
  isLoading = false;

  jobCategories = Object.values(EJobCategory);
  jobSalaryTypes = Object.values(EJobSalaryType);
  jobSalaryCurrencies = Object.values(EJobSalaryCurrency);
  jobLocationTypes = Object.values(EJobLocationType);
  jobTypes = Object.values(EJobType);
  jobStatuses = Object.values(EJobStatus);

  job: IJob;
  jobForm = this.fb.group(
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
    },
    {
      validators: [
        // if location_type is local, then location is required
        (fb) => {
          if (fb.get('location_type').value === EJobLocationType.LOCAL) {
            if (!fb.get('location').value) {
              return { location: true };
            }
          }

          return null;
        },
        // max_salary must be greater than or equal to min_salary
        (fb) => {
          if (fb.get('max_salary').value < fb.get('min_salary').value) {
            return { max_salary: true };
          }

          return null;
        },
      ],
    },
  );

  isEditing: boolean = false;
  dialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private jobService: JobService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private userProfileMenuService: UserProfileMenuService,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    if (changes.user) {
      this.getJobs(true);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getJobs(clearJobs: boolean = false) {
    if (clearJobs) this.page = 1;
    this.isLoading = true;
    this.subscriptions.push(
      this.jobService.getJobs(this.page, this.count, this.user.id).subscribe((data) => {
        if (clearJobs) this.jobs = [];
        this.jobs = this.jobs.concat(data.jobs);
        this.count = data.count;
        this.total = data.total;
        this.page++;
        this.isLoading = false;
        this.userProfileMenuService.addMenuItem('jobs', this.jobs.length > 0 || this.user?.id === this.currentUser?.id);
      }),
    );
  }

  getJob(id: number) {
    this.subscriptions.push(
      this.jobService.getJob(id).subscribe((data) => {
        this.job = data;
        this.jobForm.patchValue(this.job);
      }),
    );
  }

  createJob() {
    this.subscriptions.push(
      this.jobService.createJob(this.jobForm.value).subscribe(() => {
        this.nbToastrService.success('Job created successfully', 'Success');
        this.onCloseDialog();
        this.getJobs(true);
      }),
    );
  }

  updateJob() {
    this.subscriptions.push(
      this.jobService.updateJob(this.job.id, this.jobForm.value).subscribe(() => {
        this.nbToastrService.success('Job updated successfully', 'Success');
        this.onCloseDialog();
        this.getJobs(true);
      }),
    );
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
