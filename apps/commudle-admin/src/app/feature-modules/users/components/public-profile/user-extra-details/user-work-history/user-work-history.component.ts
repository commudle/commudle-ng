import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { UserWorkHistoryService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-work-history.service';
import { ICurrentUser } from '@commudle/shared-models';
import { IUser } from '@commudle/shared-models';
import { IUserWorkHistory } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-user-work-history',
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

  // userResumes: IUserResume[] = [];
  // userResumeForm = this.fb.group({
  //   name: ['', Validators.required],
  // });
  // uploadedResume: IAttachedFile;
  // uploadedResumeSrc: string | ArrayBuffer;

  isEditing: boolean = false;
  dialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userWorkHistoryService: UserWorkHistoryService,
    // private userResumeService: UserResumeService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    public userProfileMenuService: UserProfileMenuService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    if (changes.user) {
      this.getUserWorkHistories();

      // if (this.user?.id === this.currentUser?.id) {
      //   this.getUserResumes();
      // }
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

  // getUserResumes() {
  //   this.subscriptions.push(this.userResumeService.getResumes().subscribe((data) => (this.userResumes = data)));
  // }

  createWorkHistory() {
    this.subscriptions.push(
      this.userWorkHistoryService.createWorkHistory(this.userWorkHistoryForm.value).subscribe(() => {
        this.nbToastrService.success('Work history created successfully', 'Success');
        this.onCloseDialog();
        this.getUserWorkHistories();
      }),
    );
  }

  // createResume() {
  //   this.subscriptions.push(
  //     this.userResumeService.createResume(this.getResumeFormData()).subscribe(() => {
  //       this.nbToastrService.success('Resume uploaded successfully', 'Success');
  //       this.onCloseDialog();
  //       this.getUserResumes();
  //     }),
  //   );
  // }

  updateWorkHistory(userWorkHistoryId: number) {
    this.subscriptions.push(
      this.userWorkHistoryService.updateWorkHistory(userWorkHistoryId, this.userWorkHistoryForm.value).subscribe(() => {
        this.nbToastrService.success('Work history updated successfully', 'Success');
        this.onCloseDialog();
        this.getUserWorkHistories();
      }),
    );
  }

  // updateResume(userResumeUuid: string) {
  //   this.subscriptions.push(
  //     this.userResumeService.updateResume(userResumeUuid, this.getResumeFormData()).subscribe(() => {
  //       this.nbToastrService.success('Resume updated successfully', 'Success');
  //       this.onCloseDialog();
  //       this.getUserResumes();
  //     }),
  //   );
  // }

  onOpenDialog(templateRef: TemplateRef<any>, data?: any) {
    this.dialogRef = this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: data,
    });
  }

  onOpenEditUserWorkHistoryDialog(templateRef: TemplateRef<any>, userWorkHistory: IUserWorkHistory) {
    this.isEditing = true;
    this.userWorkHistoryForm.patchValue(userWorkHistory);
    this.onOpenDialog(templateRef, userWorkHistory);
  }

  // onOpenEditUserResumeDialog(templateRef: TemplateRef<any>, userResume: IUserResume) {
  //   this.isEditing = true;
  //   this.userResumeForm.patchValue(userResume);
  //   this.uploadedResume = userResume.resume;
  //   this.uploadedResumeSrc = userResume.resume.url;
  //   this.onOpenDialog(templateRef, userResume);
  // }

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
    // this.userResumeForm.patchValue({
    //   name: '',
    // });
    this.dialogRef.close();
    this.isEditing = false;
    // this.uploadedResume = null;
    // this.uploadedResumeSrc = null;
  }

  // onFileChange(event) {
  //   if (event.target.files && event.target.files.length) {
  //     if (event.target.files[0].type !== 'application/pdf') {
  //       this.nbToastrService.warning('File must be a pdf', 'Warning');
  //       return;
  //     }
  //
  //     if (event.target.files[0].size > 5000000) {
  //       this.nbToastrService.warning('File must be less than 5mb', 'Warning');
  //       return;
  //     }
  //
  //     const file = event.target.files[0];
  //     this.uploadedResume = {
  //       id: null,
  //       file: file,
  //       url: null,
  //       name: null,
  //       type: null,
  //     };
  //
  //     const reader = new FileReader();
  //     reader.onload = () => (this.uploadedResumeSrc = reader.result);
  //     reader.readAsDataURL(file);
  //   }
  // }
  //
  // getResumeFormData(): FormData {
  //   const formData = new FormData();
  //   const resumeValue = this.userResumeForm.value;
  //
  //   Object.keys(resumeValue).forEach((key) => {
  //     formData.append(`user_resume[${key}]`, resumeValue[key]);
  //   });
  //
  //   Object.keys(this.uploadedResume).forEach((key) => {
  //     formData.append(`user_resume[resume][${key}]`, this.uploadedResume[key]);
  //   });
  //
  //   return formData;
  // }
}
