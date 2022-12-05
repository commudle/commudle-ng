import { ViewportScroller } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogRef, NbDialogService, NbToastrService } from '@commudle/theme';
import { UserProfileMenuService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-menu.service';
import { UserResumeService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { IAttachedFile } from 'apps/shared-models/attached-file.model';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IUser } from 'apps/shared-models/user.model';
import { IUserResume } from 'apps/shared-models/user_resume.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-resume',
  templateUrl: './user-resume.component.html',
  styleUrls: ['./user-resume.component.scss'],
})
export class UserResumeComponent implements OnInit, OnChanges, OnDestroy {
  @Input() user: IUser;

  currentUser: ICurrentUser;
  jobId: number;

  userResumes: IUserResume[] = [];
  userResumeForm;
  uploadedResume: IAttachedFile;
  uploadedResumeSrc: string;

  isEditing = false;
  dialogRef: NbDialogRef<any>;

  @ViewChild('userResumeDialog', { static: true }) userResumeDialog: TemplateRef<any>;

  subscriptions: Subscription[] = [];

  constructor(
    private authWatchService: LibAuthwatchService,
    private userResumeService: UserResumeService,
    private fb: FormBuilder,
    private nbDialogService: NbDialogService,
    private nbToastrService: NbToastrService,
    public userProfileMenuService: UserProfileMenuService,
    private route: ActivatedRoute,
    private router: Router,
    private scroller: ViewportScroller,
  ) {
    this.userResumeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // TODO optimize this
    if (this.route.snapshot.queryParams['job']) {
      this.jobId = this.route.snapshot.queryParams['job'];
      setTimeout(() => {
        this.scroller.scrollToAnchor('resume');
        this.onOpenDialog(this.userResumeDialog);
      }, 1000);
    }
  }

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
        if (this.currentUser.id === this.user.id) {
          this.userProfileMenuService.addMenuItem('resume', true);
        }
      }),
    );
  }

  createResume() {
    this.subscriptions.push(
      this.userResumeService.createResume(this.getResumeFormData()).subscribe(() => {
        this.nbToastrService.success('Resume uploaded successfully', 'Success');
        this.onCloseDialog();
        this.getUserResumes();
        if (this.jobId) {
          this.router.navigate(['/jobs/', this.jobId]);
        }
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

  onOpenEditUserResumeDialog(templateRef: TemplateRef<any>, userResume: IUserResume) {
    this.isEditing = true;
    this.userResumeForm.patchValue(userResume);
    this.uploadedResume = userResume.resume;
    this.uploadedResumeSrc = userResume.resume.url;
    this.onOpenDialog(templateRef, userResume);
  }

  onCloseDialog() {
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
      reader.onload = () => (this.uploadedResumeSrc = <string>reader.result);
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
