import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';

@Component({
  selector: 'app-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  currentUser: ICurrentUser;
  uploadedProfilePicture: any;
  uploadedProfilePictureFile: File;

  basicInfoForm = this.fb.group({
    name: ['', Validators.required],
    about_me: ['', [Validators.required, Validators.maxLength(500)]],
    designation: ['', [Validators.required, Validators.maxLength(100)]],
    location: [''],
    gender: [''],
  });

  constructor(
    private fb: FormBuilder,
    private authWatchService: LibAuthwatchService,
    private toastLogService: LibToastLogService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
        this.basicInfoForm.patchValue(this.currentUser);
        this.uploadedProfilePicture = this.currentUser.avatar;
      }
    });

    this.userProfileManagerService.updateBasicInfo$.subscribe((value) => {
      if (value) {
        this.updateBasicInfo();
        this.userProfileManagerService.setUpdateBasicInfo(false);
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

  updateBasicInfo() {
    this.basicInfoForm.patchValue({
      about_me: this.basicInfoForm.get('about_me').value.replace(/[\n]+/g, '\n').trim(),
    });
    const basicInfoFormData = this.basicInfoForm.value;
    if (this.uploadedProfilePictureFile != null) {
      basicInfoFormData['profile_image'] = this.uploadedProfilePictureFile;
    }
    this.userProfileManagerService.setSubmitBasicInfo(basicInfoFormData);
  }
}
