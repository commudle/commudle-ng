import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { UpdateProfileService } from 'projects/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';

@Injectable({
  providedIn: 'root',
})
export class UserProfileManagerService {
  private updateUsername: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateUsername$ = this.updateUsername.asObservable();

  userProfileForm = this.fb.group({
    name: ['', Validators.required],
    about_me: ['', [Validators.required, Validators.maxLength(500)]],
    designation: ['', [Validators.required, Validators.maxLength(100)]],
    location: [''],
    gender: [''],
    personal_website: [''],
    github: [''],
    linkedin: [''],
    twitter: [''],
    dribbble: [''],
    behance: [''],
    medium: [''],
    gitlab: [''],
    facebook: [''],
    youtube: [''],
  });

  uploadedProfilePictureFile: File;

  constructor(
    private fb: FormBuilder,
    private usersService: AppUsersService,
    private toastLogService: LibToastLogService,
    private updateProfileService: UpdateProfileService,
    private authWatchService: LibAuthwatchService,
  ) {}

  setUpdateUsername(value: boolean) {
    this.updateUsername.next(value);
  }

  updateUserDetails() {
    const formData: any = new FormData();
    //removing extra new lines from the about_me input
    this.userProfileForm.patchValue({
      about_me: this.userProfileForm.get('about_me').value.replace(/[\n]+/g, '\n').trim(),
    });
    const userFormData = this.userProfileForm.value;
    Object.keys(userFormData).forEach((key) =>
      !(userFormData[key] == null) ? formData.append(`user[${key}]`, userFormData[key]) : '',
    );

    console.log(this.uploadedProfilePictureFile);

    if (this.uploadedProfilePictureFile != null) {
      formData.append('user[profile_image]', this.uploadedProfilePictureFile);
    }

    this.usersService.updateUserProfile(formData).subscribe(() => {
      this.authWatchService.updateSignedInUser();
      this.toastLogService.successDialog('Your Profile is now updated!');
      this.updateProfileService.setUpdateProfileStatus(true);
    });
  }
}
