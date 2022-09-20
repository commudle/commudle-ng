import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ICurrentUser } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { LibToastLogService } from '@commudle/shared-services';
import { UserProfileManagerService } from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';

@Component({
  selector: 'commudle-basic-info',
  templateUrl: './basic-info.component.html',
  styleUrls: ['./basic-info.component.scss'],
})
export class BasicInfoComponent implements OnInit {
  currentUser: ICurrentUser;
  uploadedProfilePicture: any;
  uploadedProfilePictureFile: File;
  @Output() basicInfoFormValidity: EventEmitter<boolean> = new EventEmitter<boolean>();

  basicInfoForm = this.fb.group({
    name: ['', Validators.required],
    about_me: ['', [Validators.required, Validators.maxLength(1000)]],
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
        this.basicInfoFormValidity.emit(this.basicInfoForm.valid); //initial validity
        this.uploadedProfilePicture = this.currentUser.avatar;
        this.userProfileManagerService.userProfileForm.patchValue(this.basicInfoForm.value);
      }
    });

    this.basicInfoForm.valueChanges.subscribe((value) => {
      this.userProfileManagerService.userProfileForm.patchValue(value);
      this.basicInfoFormValidity.emit(this.basicInfoForm.valid); // whenever form value changes check validity
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

      if (this.uploadedProfilePictureFile != null) {
        this.userProfileManagerService.uploadedProfilePictureFile = this.uploadedProfilePictureFile;
      }

      const reader = new FileReader();
      reader.onload = () => (this.uploadedProfilePicture = reader.result);
      reader.readAsDataURL(file);
    }
  }
}
