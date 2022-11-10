import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { JobApplicationService } from 'projects/commudle-admin/src/app/feature-modules/jobs/services/job-application.service';
import { UserResumeService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { JobService } from 'projects/commudle-admin/src/app/services/job.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EJobLocationType, EJobStatus, IJob } from 'projects/shared-models/job.model';
import { IUserResume } from 'projects/shared-models/user_resume.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit, OnDestroy {
  currentUser: ICurrentUser;

  job: IJob;
  userResumes: IUserResume[] = [];
  selectedUserResumeId: number;
  isResumeLoading = false;

  jobStatus = EJobStatus;
  jobLocationType = EJobLocationType;

  subscriptions: Subscription[] = [];
  faBuilding = faBuilding;

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private jobApplicationService: JobApplicationService,
    private userResumeService: UserResumeService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    this.subscriptions.push(this.activatedRoute.params.subscribe((data) => this.getJob(data.id)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getJob(id: number): void {
    this.subscriptions.push(this.jobService.getJob(id).subscribe((value) => (this.job = value)));
  }

  getResumes(): void {
    this.isResumeLoading = true;
    this.subscriptions.push(
      this.userResumeService.getResumes().subscribe((value) => {
        this.userResumes = value;
        this.selectedUserResumeId = this.userResumes[0]?.id;
        this.isResumeLoading = false;
      }),
    );
  }

  onDialogOpen(templateRef: TemplateRef<any>): void {
    this.nbDialogService.open(templateRef, { closeOnEsc: false, closeOnBackdropClick: false });
    this.getResumes();
  }

  createJobApplication(): void {
    this.subscriptions.push(
      this.jobApplicationService.createJobApplication(this.job.id, this.selectedUserResumeId).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('You have successfully applied for this job', 'Success');
        }
      }),
    );
  }
}
