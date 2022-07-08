import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { UserProfileMenuService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { UserWorkHistoryService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-work-history.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUser } from 'projects/shared-models/user.model';
import { IUserWorkHistory } from 'projects/shared-models/user_work_history.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-work-history',
  templateUrl: './user-work-history.component.html',
  styleUrls: ['./user-work-history.component.scss'],
})
export class UserWorkHistoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;
  userWorkHistories: IUserWorkHistory[] = [];
  userWorkHistoryForm = this.fb.group(
    {
      job_title: ['', Validators.required],
      company: ['', Validators.required],
      location: ['', Validators.required],
      start_date: [new Date().toISOString().substring(0, 7), Validators.required],
      end_date: [''],
      is_working: [true, Validators.required],
      description: [''],
    },
    {
      validators: [
        // end_date must be greater than start_date
        (fb) => {
          const startDate = fb.get('start_date').value;
          const endDate = fb.get('end_date').value;
          if (startDate && endDate && startDate > endDate) {
            return { endDateLessThanStartDate: true };
          }
          return null;
        },
        // if is_working is false, then end_date should be filled
        // if is_working is true, then end_date should be empty
        (fb) => {
          const isWorking = fb.get('is_working').value;
          const endDate = fb.get('end_date').value;
          if (!isWorking && !endDate) {
            return { endDateRequired: true };
          } else if (isWorking && endDate) {
            return { endDateNotRequired: true };
          }
          return null;
        },
      ],
    },
  );
  isEditing: boolean = false;

  userWorkHistoryDialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userWorkHistoryService: UserWorkHistoryService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    public userProfileMenuService: UserProfileMenuService,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.user) {
      this.getUserWorkHistories();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUserWorkHistories() {
    this.subscriptions.push(
      this.userWorkHistoryService.getWorkHistories(this.user.id).subscribe((data) => {
        this.userWorkHistories = data;
        this.userProfileMenuService.addMenuItem('workHistory', this.userWorkHistories.length > 0);
      }),
    );
  }

  createWorkHistory() {
    this.subscriptions.push(
      this.userWorkHistoryService.createWorkHistory(this.userWorkHistoryForm.value).subscribe(() => {
        this.nbToastrService.success('Success', 'Work history created successfully');
        this.onCloseDialog();
        this.getUserWorkHistories();
      }),
    );
  }

  updateWorkHistory(userWorkHistoryId: number) {
    this.subscriptions.push(
      this.userWorkHistoryService.updateWorkHistory(userWorkHistoryId, this.userWorkHistoryForm.value).subscribe(() => {
        this.nbToastrService.success('Success', 'Work history updated successfully');
        this.onCloseDialog();
        this.getUserWorkHistories();
      }),
    );
  }

  onOpenCreateDialog(templateRef: TemplateRef<any>) {
    this.userWorkHistoryDialogRef = this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
    });
  }

  onOpenEditDialog(templateRef: TemplateRef<any>, userWorkHistory: IUserWorkHistory) {
    this.isEditing = true;
    this.userWorkHistoryForm.patchValue(userWorkHistory);
    this.userWorkHistoryDialogRef = this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: { userWorkHistory },
    });
  }

  onCloseDialog() {
    this.userWorkHistoryForm.reset();
    this.userWorkHistoryDialogRef.close();
  }
}
