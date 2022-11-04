import { Clipboard } from '@angular/cdk/clipboard';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { JobService } from 'projects/commudle-admin/src/app/services/job.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { EJobLocationType, EJobStatus, IJob } from 'projects/shared-models/job.model';
import { IUser } from 'projects/shared-models/user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { NavigatorShareService } from 'projects/shared-services/navigator-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-job-card',
  templateUrl: './user-job-card.component.html',
  styleUrls: ['./user-job-card.component.scss'],
})
export class UserJobCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;
  @Input() job: IJob;

  @Output() updateJob: EventEmitter<any> = new EventEmitter<any>();
  @Output() deleteJob: EventEmitter<any> = new EventEmitter<any>();
  @Output() toggleJobStatus: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;
  jobLink: string;

  EJobLocationType = EJobLocationType;
  jobStatus = EJobStatus;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private jobService: JobService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private navigatorShareService: NavigatorShareService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.job) {
      this.jobLink = `${window.location.href.split('#')[0]}/jobs/${this.job.id}`;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
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

  copyTextToClipboard(): void {
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
}
