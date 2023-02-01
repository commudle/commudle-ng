import { Component, OnInit } from '@angular/core';
import { NbTagComponent, NbTagInputAddEvent, NbToastrService } from '@commudle/theme';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { StepperService } from 'apps/commudle-admin/src/app/services/stepper.service';
import { faUsersViewfinder, faGlobe, faUser, faComments, faFile } from '@fortawesome/free-solid-svg-icons';
import { IUser } from 'apps/shared-models/user.model';
import { FormBuilder, Validators } from '@angular/forms';
import { IAttachedFile } from 'apps/shared-models/attached-file.model';
import { Subscription } from 'rxjs';
import { UserResumeService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-resume.service';
import { IUserResume } from 'apps/shared-models/user_resume.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  tagsDialog: string[] = [];
  tags: string[] = [];
  user: IUser;
  uploadedResume: IAttachedFile;
  userResumes: IUserResume[] = [];

  faUser = faUser;
  faUsersViewfinder = faUsersViewfinder;
  faComments = faComments;
  faGlobe = faGlobe;
  faFile = faFile;

  uploadedResumeSrc: string;
  userResumeForm;

  validUsername = true;
  jobApplySection = false;
  validBasicDetailsStatus: boolean;
  validSocialLinksStatus: boolean;
  haveResume = false;

  subscriptions: Subscription[] = [];

  existingTags = [
    'Web Development',
    'Devops',
    'UI/UX Design',
    'DSA Problem Solving',
    'Product Design',
    'App Development',
  ];

  constructor(
    private authWatchService: LibAuthwatchService,
    private usersService: AppUsersService,
    private userProfileManagerService: UserProfileManagerService,
    private stepperService: StepperService,
    private fb: FormBuilder,
    private nbToastrService: NbToastrService,
    private userResumeService: UserResumeService,
  ) {
    this.userResumeForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.usersService.getProfile(currentUser.username).subscribe((data) => {
          if (data) {
            this.user = data;
            if (this.tags.length != data.tags.length) {
              data.tags.forEach((tag) => this.tags.push(tag.name));
              this.tagsDialog = [];
              this.tags.forEach((tag) => this.tagsDialog.push(tag));
            }
          }
        });
      }
    });
    this.getResume();
  }

  // Function to remove a tag
  onTagRemove(tagToRemove: NbTagComponent): void {
    this.tagsDialog = this.tagsDialog.filter((tag) => tag !== tagToRemove.text);
  }

  // Function to add a tag
  onTagAdd({ value, input }: NbTagInputAddEvent): void {
    // Add a tag if the value is not empty and the number of tags is under the allowed limit
    if (value) {
      // Add a tag only if it is not present
      if (!this.tagsDialog.includes(value)) {
        this.tagsDialog.push(value);
      }
    }
    // Reset the input
    input.nativeElement.value = '';
  }

  addTag(tag) {
    if (!this.tagsDialog.includes(tag)) {
      this.tagsDialog.push(tag);
      this.existingTags.forEach((element, index) => {
        if (element == tag) this.existingTags.splice(index, 1);
      });
    }
  }

  restrictComma(event) {
    if (event.code === 'Comma') {
      event.preventDefault();
    }
  }

  submitStepOne() {
    // Get the updated user tags
    this.tags = this.tagsDialog;
    // When the save button is clicked, update the tags
    this.usersService.updateTags({ tags: this.tags }).subscribe(() => {
      this.authWatchService.updateSignedInUser();
    });
    //update username
    this.userProfileManagerService.setUpdateUsername(true);
  }

  submitStepTwo() {
    this.userProfileManagerService.updateUserDetails(false);
  }

  submitStepThree() {
    this.userProfileManagerService.updateUserDetails(false);
  }

  checkUsername(validUsername) {
    this.validUsername = validUsername;
  }

  checkBasicDetailsValidity(status: boolean) {
    this.validBasicDetailsStatus = status;
  }

  checkSocialLinksValidity(status: boolean) {
    this.validSocialLinksStatus = status;
  }

  closeStepper() {
    this.stepperService.dialogRef.close();
  }

  openForWork() {
    this.userProfileManagerService.toggleEmployee().subscribe(() => {});
  }

  openForHiring() {
    this.userProfileManagerService.toggleEmployer().subscribe(() => {});
  }

  onFileChange(event) {
    if (event.target.files && event.target.files.length) {
      if (event.target.files[0].type !== 'application/pdf') {
        this.nbToastrService.warning('File must be a pdf', 'Warning');
        return;
      } else if (event.target.files[0].size > 5000000) {
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
    this.haveResume = false;
    this.userResumeForm.get('name').patchValue('');
  }

  createResume() {
    this.subscriptions.push(
      this.userResumeService.createResume(this.getResumeFormData()).subscribe(() => {
        this.nbToastrService.success('Resume uploaded successfully', 'Success');
        this.jobApplySection = true;
        this.getResume();
      }),
    );
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

  getResume() {
    this.subscriptions.push(
      this.userResumeService.getResumes().subscribe((data) => {
        this.userResumes = data;
        if (this.userResumes.length > 0) {
          this.userResumeForm.get('name').patchValue(this.userResumes[0].name);
          this.haveResume = true;
          this.jobApplySection = true;
        }
      }),
    );
  }
}
