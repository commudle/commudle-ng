import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { faBehance, faDribbble, faFacebook, faGitlab, faMediumM, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { UpdateProfileService } from 'projects/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import { AppUsersService } from 'projects/commudle-admin/src/app/services/app-users.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { combineLatest } from 'rxjs';
@Component({
  selector: 'app-basic-user-profile',
  templateUrl: './basic-user-profile.component.html',
  styleUrls: ['./basic-user-profile.component.scss'],
})
export class BasicUserProfileComponent implements OnInit {
  @Input() pagePadding = true;
  currentUser: ICurrentUser;
  uploadedProfilePicture: any;
  uploadedProfilePictureFile: File;

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

  faYoutube = faYoutube;
  faMediumM = faMediumM;
  faDribbble = faDribbble;
  faBehance = faBehance;
  faGitlab = faGitlab;
  faFacebook = faFacebook;

  constructor(
    private authWatchService: LibAuthwatchService,
    private fb: FormBuilder,
    private usersService: AppUsersService,
    private toastLogService: LibToastLogService,
    private updateProfileService: UpdateProfileService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
        this.userProfileForm.patchValue(this.currentUser);
        this.uploadedProfilePicture = this.currentUser.avatar;
      }
    });

    combineLatest(
      this.userProfileManagerService.submitBasicInfo$,
      this.userProfileManagerService.submitSocialLinks$,
    ).subscribe(([basicInfoFormData, socialLinksFormData]) => {
      if (basicInfoFormData && socialLinksFormData) {
        const formData: FormData = new FormData();
        Object.keys(basicInfoFormData).forEach((key) =>
          !(basicInfoFormData[key] == null) ? formData.append(`user[${key}]`, basicInfoFormData[key]) : '',
        );
        Object.keys(socialLinksFormData).forEach((key) =>
          !(socialLinksFormData[key] == null) ? formData.append(`user[${key}]`, socialLinksFormData[key]) : '',
        );

        this.usersService.updateUserProfile(formData).subscribe(() => {
          this.authWatchService.updateSignedInUser();
          this.toastLogService.successDialog('Your Profile is now updated!');
          this.updateProfileService.setUpdateProfileStatus(true);
          this.userProfileManagerService.setSubmitBasicInfo(null);
          this.userProfileManagerService.setSubmitSocialLinks(null);
        });
      }
    });
  }

  displaySelectedProfileImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.size > 2425190) {
        this.toastLogService.warningDialog('Image should be less than 2 Mb', 3000);
        return;
      }
      this.uploadedProfilePictureFile = file;
      const reader = new FileReader();
      reader.onload = () => (this.uploadedProfilePicture = reader.result);
      reader.readAsDataURL(file);
    }
  }

  updateUserDetails() {
    this.userProfileManagerService.setUpdateBasicInfo(true);
    this.userProfileManagerService.setUpdateSocialLinks(true);
    // const formData: any = new FormData();
    // //removing extra new lines from the about_me input
    // this.userProfileForm.patchValue({
    //   about_me: this.userProfileForm.get('about_me').value.replace(/[\n]+/g, '\n').trim(),
    // });
    // const userFormData = this.userProfileForm.value;
    // Object.keys(userFormData).forEach((key) =>
    //   !(userFormData[key] == null) ? formData.append(`user[${key}]`, userFormData[key]) : '',
    // );

    // if (this.uploadedProfilePictureFile != null) {
    //   formData.append('user[profile_image]', this.uploadedProfilePictureFile);
    // }

    // this.usersService.updateUserProfile(formData).subscribe(() => {
    //   this.authWatchService.updateSignedInUser();
    //   this.toastLogService.successDialog('Your Profile is now updated!');
    //   this.updateProfileService.setUpdateProfileStatus(true);
    // });
  }
}
