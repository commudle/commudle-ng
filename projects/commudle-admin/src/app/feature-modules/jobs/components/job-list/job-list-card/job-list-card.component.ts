import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { JobApplicationService } from 'projects/commudle-admin/src/app/feature-modules/jobs/services/job-application.service';
import { UserResumeService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IJob } from 'projects/shared-models/job.model';
import { IUserResume } from 'projects/shared-models/user_resume.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-job-list-card',
  templateUrl: './job-list-card.component.html',
  styleUrls: ['./job-list-card.component.scss'],
})
export class JobListCardComponent implements OnInit {
  @Input() job: IJob;

  currentUser: ICurrentUser;
  userResumes: IUserResume[] = [];
  subscriptions: Subscription[] = [];

  selectedUserResumeId: number;
  faBuilding = faBuilding;

  constructor(
    private authWatchService: LibAuthwatchService,
    private nbDialogService: NbDialogService,
    private userResumeService: UserResumeService,
    private jobApplicationService: JobApplicationService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getResumes(): void {
    this.subscriptions.push(
      this.userResumeService.getResumes().subscribe((value) => {
        this.userResumes = value;
        this.selectedUserResumeId = this.userResumes[0]?.id;
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
