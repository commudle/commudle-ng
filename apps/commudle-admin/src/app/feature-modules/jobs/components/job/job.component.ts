import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService, NbToastrService } from '@commudle/theme';
import { JobApplicationService } from 'apps/commudle-admin/src/app/feature-modules/jobs/services/job-application.service';
import { UserResumeService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { JobService } from 'apps/commudle-admin/src/app/services/job.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { EJobLocationType, EJobStatus, EJobCategory, IJob } from 'apps/shared-models/job.model';
import { IUserResume } from 'apps/shared-models/user_resume.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import {
  faBuilding,
  faIdCard,
  faClock,
  faSuitcase,
  faLocationDot,
  faMoneyBills,
} from '@fortawesome/free-solid-svg-icons';
import { faCalendar } from '@fortawesome/free-regular-svg-icons';
import { SeoService } from 'apps/shared-services/seo.service';
import { UserConsentsComponent } from 'apps/commudle-admin/src/app/app-shared-components/user-consents/user-consents.component';
import { ConsentTypesEnum } from 'apps/shared-models/enums/consent-types.enum';
import { LibErrorHandlerService } from 'apps/lib-error-handler/src/lib/lib-error-handler.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit, OnDestroy {
  @ViewChild('createJobApplicationDialog') createJobApplicationDialog: TemplateRef<any>;
  currentUser: ICurrentUser;

  job: IJob;
  userResumes: IUserResume[] = [];
  selectedUserResumeId: number;
  isResumeLoading = false;

  EJobStatus = EJobStatus;
  EJobCategory = EJobCategory;
  EJobLocationType = EJobLocationType;

  subscriptions: Subscription[] = [];
  faBuilding = faBuilding;
  faIdCard = faIdCard;
  faClock = faClock;
  faSuitcase = faSuitcase;
  faLocationDot = faLocationDot;
  faMoneyBills = faMoneyBills;
  faCalendar = faCalendar;

  constructor(
    private authWatchService: LibAuthwatchService,
    private activatedRoute: ActivatedRoute,
    private jobService: JobService,
    private jobApplicationService: JobApplicationService,
    private userResumeService: UserResumeService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private seoService: SeoService,
    private route: Router,
    private errorHandler: LibErrorHandlerService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    this.subscriptions.push(this.activatedRoute.params.subscribe((data) => this.getJob(data.id)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getJob(id: number): void {
    this.subscriptions.push(
      this.jobService.getJob(id).subscribe((value) => {
        this.job = value;
        this.setMeta();
      }),
    );
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

  checkCurrentUser() {
    if (this.currentUser) {
      this.onDialogOpen(this.createJobApplicationDialog);
    } else {
      this.errorHandler.handleError(401, 'Login to apply');
    }
  }

  createJobApplication(): void {
    this.subscriptions.push(
      this.jobApplicationService.createJobApplication(this.job.id, this.selectedUserResumeId).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('You have successfully applied for this job', 'Success');
          this.route.navigate(['/jobs/my-applications']);
        }
      }),
    );
  }

  setMeta(): void {
    this.seoService.setTags(
      `${this.job.position} - ${this.job.job_type} - ${this.job.company}`,
      `${this.job.user.name} is hiring - ${this.job.position} - ${this.job.job_type} for ${this.job.company} ${
        this.job.status === EJobStatus.OPEN ? ', Apply Now!' : '.'
      }`,
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }

  reDirectTo() {
    this.route.navigate(['/users/', this.currentUser.username], {
      fragment: 'resume',
      queryParams: { job_id: this.job.id },
    });
  }

  onAcceptRoleButton() {
    const dialogRef = this.nbDialogService.open(UserConsentsComponent, {
      context: {
        consentType: ConsentTypesEnum.ResumeConsent,
      },
    });
    dialogRef.componentRef.instance.consentOutput.subscribe((result) => {
      dialogRef.close();
      if (result === 'accepted') {
        this.createJobApplication();
      }
    });
  }
}
