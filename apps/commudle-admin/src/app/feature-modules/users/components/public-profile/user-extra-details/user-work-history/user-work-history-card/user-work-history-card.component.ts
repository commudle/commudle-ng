import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { UserWorkHistoryService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-work-history.service';
import { ICurrentUser } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';
import { IUserWorkHistory } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-user-work-history-card',
  templateUrl: './user-work-history-card.component.html',
  styleUrls: ['./user-work-history-card.component.scss'],
})
export class UserWorkHistoryCardComponent implements OnInit, OnDestroy {
  @Input() user: IUser;
  @Input() userWorkHistory: IUserWorkHistory;

  @Output() updateUserWorkHistory: EventEmitter<any> = new EventEmitter<any>();
  @Output() reloadUserWorkHistory: EventEmitter<any> = new EventEmitter<any>();

  currentUser: ICurrentUser;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userWorkHistoryService: UserWorkHistoryService,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  deleteUserWorkHistory() {
    this.subscriptions.push(
      this.userWorkHistoryService.deleteWorkHistory(this.userWorkHistory.id).subscribe((value) => {
        if (value) {
          this.nbToastrService.success('Work history deleted successfully', 'Success');
          this.reloadUserWorkHistory.emit();
        }
      }),
    );
  }

  onDialogOpen(templateRef: TemplateRef<any>) {
    this.nbDialogService.open(templateRef, { closeOnEsc: false, closeOnBackdropClick: false });
  }
}
