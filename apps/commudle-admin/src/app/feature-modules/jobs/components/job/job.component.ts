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
import { EnumFormatPipe } from 'apps/shared-pipes/enum-format.pipe';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.scss'],
  providers: [EnumFormatPipe],
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
    private enumFormatPipe: EnumFormatPipe,
    private datePipe: DatePipe,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data) => {
        this.currentUser = data;
      }),
    ),
      this.activatedRoute.params.subscribe((data) => {
        this.getJob(data.id);
      });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getJob(id: number): void {
    this.subscriptions.push(
      this.jobService.getJob(id).subscribe((value) => {
        this.job = value;
        this.setSchemaData();
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

  setSchemaData() {
    const jobLocation = this.job.location.split(',');
    const datePosted = this.datePipe.transform(this.job.created_at, 'yyyy-MM-dd');
    const validThrough = this.datePipe.transform(this.job.expired_at, 'yyyy-MM-dd');
    const employmentType = this.enumFormatPipe.transform(this.job.job_type);

    // Common schema data
    const schemaData: any = {
      '@context': 'https://schema.org/',
      '@type': 'JobPosting',
      title: this.job.position,
      description: this.job.description,
      hiringOrganization: {
        '@type': 'Organization',
        name: this.job.company,
      },
      employmentType: employmentType,
      datePosted: datePosted,
      validThrough: validThrough,
    };

    // Schema data for base salary under job
    if (this.job.min_salary !== 0) {
      schemaData.baseSalary = {
        '@type': 'MonetaryAmount',
        currency: this.job.salary_currency,
        value: {
          '@type': 'QuantitativeValue',
          minValue: this.job.min_salary,
          maxValue: this.job.max_salary,
          unitText: this.job.salary_type,
        },
      };
    }
    // schema data for remote job
    if (this.job.location_type === EJobLocationType.REMOTE) {
      schemaData.applicantLocationRequirements = {
        '@type': 'Country',
        name: jobLocation[1],
      };
      schemaData.jobLocationType = 'TELECOMMUTE';
    } // schema data for non remote location job
    else {
      schemaData.jobLocation = {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: jobLocation[0],
          addressCountry: jobLocation[1],
        },
      };
    }

    this.seoService.setSchema(schemaData);
  }
}
