import { Component, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { EJobLocationType, EJobStatus, IJob } from 'apps/shared-models/job.model';
import { IUserResume } from 'apps/shared-models/user_resume.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';
import {
  faBuilding,
  faMoneyBills,
  faLocationDot,
  faIdCard,
  faClock,
  faSuitcase,
  faPencil,
  faShareAlt,
  faUsers,
  faInfoCircle,
  faEyeSlash,
  faEye,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { NbDialogService, NbToastrService } from '@commudle/theme';
import { NavigatorShareService } from 'apps/shared-services/navigator-share.service';
import { environment } from 'apps/commudle-admin/src/environments/environment';
import { JobService } from 'apps/commudle-admin/src/app/services/job.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { IUser } from 'apps/shared-models/user.model';

@Component({
  selector: 'app-job-list-card',
  templateUrl: './job-list-card.component.html',
  styleUrls: ['./job-list-card.component.scss'],
})
export class JobListCardComponent implements OnInit {
  @Input() job: IJob;
  @Input() applyButton = true;
  @Input() applicationsCount = true;
  @Input() userProfile = true;
  @Input() user: IUser;
  @Input() showAdminButtons = false;

  @Output() updateJob: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteJob: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleJobStatus: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;
  userResumes: IUserResume[] = [];
  subscriptions: Subscription[] = [];
  jobLink: string;

  EJobLocationType = EJobLocationType;

  jobStatus = EJobStatus;

  selectedUserResumeId: number;
  faBuilding = faBuilding;
  faMoneyBills = faMoneyBills;
  faLocationDot = faLocationDot;
  faIdCard = faIdCard;
  faClock = faClock;
  faSuitcase = faSuitcase;
  faPencil = faPencil;
  faShareAlt = faShareAlt;
  faUsers = faUsers;
  faInfoCircle = faInfoCircle;
  faEyeSlash = faEyeSlash;
  faEye = faEye;
  faTrash = faTrash;

  constructor(
    private authWatchService: LibAuthwatchService,
    private nbToastrService: NbToastrService,
    private nbDialogService: NbDialogService,
    private navigatorShareService: NavigatorShareService,
    private clipboard: Clipboard,
    private jobService: JobService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
    this.jobLink = `${environment.app_url}/jobs/${this.job.id}`;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  copyTextToClipboard(id): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(this.jobLink)) {
        this.nbToastrService.success('Copied job link to clipboard!', 'Success');
      }
      return;
    }

    this.navigatorShareService
      .share({ title: 'Hey, check out this job!', url: this.jobLink })
      .then(() => this.nbToastrService.success('Shared job link!', 'Success'));
  }

  updateJobStatus(): void {
    this.subscriptions.push(
      this.jobService.toggleStatus(this.job.id).subscribe((data: IJob) => {
        if (data) {
          this.nbToastrService.success('Job updated successfully', 'Success');
          this.job = data;
        }
      }),
    );
  }

  onDeleteJob(): void {
    this.subscriptions.push(
      this.jobService.deleteJob(this.job.id).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('Job deleted successfully', 'Success');
          this.deleteJob.emit(this.job.id);
        }
      }),
    );
  }

  onDialogOpen(templateRef: TemplateRef<any>) {
    this.nbDialogService.open(templateRef, { closeOnEsc: false, closeOnBackdropClick: false });
  }
}
