import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@commudle/theme';
import { faBuilding } from '@fortawesome/free-solid-svg-icons';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { UserWorkHistoryService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-work-history.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserWorkHistory } from 'apps/shared-models/user_work_history.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-work-history',
  templateUrl: './user-work-history.component.html',
  styleUrls: ['./user-work-history.component.scss'],
})
export class UserWorkHistoryComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;
  faBuilding = faBuilding;

  userWorkHistories: IUserWorkHistory[] = [];
  userWorkHistoryForm: FormGroup<{
    job_title: FormControl<string>;
    company: FormControl<string>;
    location: FormControl<string>;
    start_date: FormControl<string>;
    end_date: FormControl<string>;
    is_working: FormControl<boolean>;
    description: FormControl<string>;
  }>;

  isEditing = false;
  dialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userWorkHistoryService: UserWorkHistoryService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    public userProfileMenuService: UserProfileMenuService,
  ) {
    this.userWorkHistoryForm = this.fb.group(
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
  }

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

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
        this.userProfileMenuService.addMenuItem(
          'workHistory',
          this.userWorkHistories.length > 0 || this.user?.id === this.currentUser?.id,
        );
      }),
    );
  }

  createWorkHistory() {
    this.subscriptions.push(
      this.userWorkHistoryService
        .createWorkHistory(this.updateWorkHistoryDates(this.userWorkHistoryForm.value))
        .subscribe(() => {
          this.nbToastrService.success('Work history created successfully', 'Success');
          this.onCloseDialog();
          this.getUserWorkHistories();
        }),
    );
  }

  updateWorkHistory(userWorkHistoryId: number) {
    this.subscriptions.push(
      this.userWorkHistoryService
        .updateWorkHistory(userWorkHistoryId, this.updateWorkHistoryDates(this.userWorkHistoryForm.value))
        .subscribe(() => {
          this.nbToastrService.success('Work history updated successfully', 'Success');
          this.onCloseDialog();
          this.getUserWorkHistories();
        }),
    );
  }

  addDay(date: string) {
    return new Date(date).toISOString().substring(0, 10);
  }

  removeDay(date: string) {
    return new Date(date).toISOString().substring(0, 7);
  }

  updateWorkHistoryDates(userWorkHistory) {
    return {
      ...this.userWorkHistoryForm.value,
      start_date: this.addDay(userWorkHistory.start_date),
      end_date: userWorkHistory.end_date ? this.addDay(userWorkHistory.end_date) : '',
    };
  }

  onOpenDialog(templateRef: TemplateRef<any>, data?: any) {
    this.dialogRef = this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: data,
    });
  }

  onOpenEditUserWorkHistoryDialog(templateRef: TemplateRef<any>, userWorkHistory: IUserWorkHistory) {
    this.isEditing = true;
    this.userWorkHistoryForm.patchValue({
      ...userWorkHistory,
      start_date: this.removeDay(userWorkHistory.start_date),
      end_date: userWorkHistory.end_date ? this.removeDay(userWorkHistory.end_date) : '',
    });
    this.onOpenDialog(templateRef, userWorkHistory);
  }

  onCloseDialog() {
    this.userWorkHistoryForm.patchValue({
      job_title: '',
      company: '',
      location: '',
      start_date: new Date().toISOString().substring(0, 7),
      end_date: '',
      is_working: true,
      description: '',
    });
    this.dialogRef.close();
    this.isEditing = false;
  }
}
