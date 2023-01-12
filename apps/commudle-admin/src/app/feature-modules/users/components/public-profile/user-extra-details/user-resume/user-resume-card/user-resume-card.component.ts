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
import { NbDialogService, NbToastrService } from '@commudle/theme';
import { UserResumeService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserResume } from 'apps/shared-models/user_resume.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { NavigatorShareService } from 'apps/shared-services/navigator-share.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-resume-card',
  templateUrl: './user-resume-card.component.html',
  styleUrls: ['./user-resume-card.component.scss'],
})
export class UserResumeCardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;
  @Input() userResume: IUserResume;

  @Output() updateUserResume: EventEmitter<any> = new EventEmitter<any>();
  @Output() reloadUserResume: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;
  resumeLink: string;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userResumeService: UserResumeService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    private navigatorShareService: NavigatorShareService,
    private clipboard: Clipboard,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.userResume) {
      this.resumeLink = `${window.location.href.split('#')[0]}/(p:resume/${this.userResume.uuid})`;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  deleteUserResume() {
    this.subscriptions.push(
      this.userResumeService.deleteResume(this.userResume.uuid).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('Resume deleted successfully', 'Success');
          this.reloadUserResume.emit();
        }
      }),
    );
  }

  onDialogOpen(templateRef: TemplateRef<any>) {
    this.nbDialogService.open(templateRef, { closeOnEsc: false, closeOnBackdropClick: false });
  }

  copyTextToClipboard(): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(this.resumeLink)) {
        this.nbToastrService.success('Copied resume link to clipboard!', 'Success');
      }
      return;
    }

    this.navigatorShareService
      .share({ title: 'Hey, check out my resume!', url: this.resumeLink })
      .then(() => this.nbToastrService.success('Shared resume link!', 'Success'));
  }
}
