import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NbDialogRef, NbDialogService, NbToastrService } from '@nebular/theme';
import { UserProfileMenuService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { UserResumeService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { IAttachedFile } from 'projects/shared-models/attached-file.model';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { IUser } from 'projects/shared-models/user.model';
import { IUserResume } from 'projects/shared-models/user_resume.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-resume',
  templateUrl: './user-resume.component.html',
  styleUrls: ['./user-resume.component.scss'],
})
export class UserResumeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;

  userResumes: IUserResume[] = [];
  userResumeForm = this.fb.group({
    name: ['', Validators.required],
  });
  uploadedResume: IAttachedFile;
  uploadedResumeSrc: string | ArrayBuffer;

  isEditing: boolean = false;
  dialogRef: NbDialogRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userResumeService: UserResumeService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    public userProfileMenuService: UserProfileMenuService,
  ) {}

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    this.subscriptions.push(this.authWatchService.currentUser$.subscribe((data) => (this.currentUser = data)));

    if (changes.user && this.user?.id === this.currentUser?.id) {
      this.getUserResumes();
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  getUserResumes() {
    this.subscriptions.push(
      this.userResumeService.getResumes().subscribe((data) => {
        this.userResumes = data;
        this.userProfileMenuService.addMenuItem('resume', true);
      }),
    );
  }

  createResume() {
    this.subscriptions.push(
      this.userResumeService.createResume(this.getResumeFormData()).subscribe(() => {
        this.nbToastrService.success('Resume uploaded successfully', 'Success');
        this.onCloseDialog();
        this.getUserResumes();
      }),
    );
  }

  updateResume(userResumeUuid: string) {
    this.subscriptions.push(
      this.userResumeService.updateResume(userResumeUuid, this.getResumeFormData()).subscribe(() => {
        this.nbToastrService.success('Resume updated successfully', 'Success');
        this.onCloseDialog();
        this.getUserResumes();
      }),
    );
  }

  onOpenDialog(templateRef: TemplateRef<any>, data?: any) {
    this.dialogRef = this.nbDialogService.open(templateRef, {
      closeOnEsc: false,
      closeOnBackdropClick: false,
      context: data,
    });
  }

  // onOpenEditUserWorkHistoryDialog(templateRef: TemplateRef<any>, userWorkHistory: IUserWorkHistory) {
  //   this.isEditing = true;
  //   this.userWorkHistoryForm.patchValue(userWorkHistory);
  //   this.onOpenDialog(templateRef, userWorkHistory);
  // }

  onOpenEditUserResumeDialog(templateRef: TemplateRef<any>, userResume: IUserResume) {
    this.isEditing = true;
    this.userResumeForm.patchValue(userResume);
    this.uploadedResume = userResume.resume;
    this.uploadedResumeSrc = userResume.resume.url;
    this.onOpenDialog(templateRef, userResume);
  }

  onCloseDialog() {
    // this.userWorkHistoryForm.patchValue({
    //   job_title: '',
    //   company: '',
    //   location: '',
    //   start_date: new Date().toISOString().substring(0, 7),
    //   end_date: '',
    //   is_working: true,
    //   description: '',
    // });
    this.userResumeForm.patchValue({
      name: '',
    });
    this.dialogRef.close();
    this.isEditing = false;
    this.uploadedResume = null;
    this.uploadedResumeSrc = null;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.nbToastrService.warning('File must be a pdf', 'Warning');
        return;
      }

      if (event.target.files[0].size > 5000000) {
        this.nbToastrService.warning('File must be less than 5mb', 'Warning');
        return;
      }

      const file = event.target.files[0];
      this.uploadedResume = {
        id: null,
        file: file,
        url: null,
        name: null,
        type: null,
      };

      const reader = new FileReader();
      reader.onload = () => (this.uploadedResumeSrc = reader.result);
      reader.readAsDataURL(file);
    }
  }

  getResumeFormData(): FormData {
    const formData = new FormData();
    const resumeValue = this.userResumeForm.value;

    Object.keys(resumeValue).forEach((key) => {
      formData.append(`user_resume[${key}]`, resumeValue[key]);
    });

    Object.keys(this.uploadedResume).forEach((key) => {
      formData.append(`user_resume[resume][${key}]`, this.uploadedResume[key]);
    });

    return formData;
  }
}
