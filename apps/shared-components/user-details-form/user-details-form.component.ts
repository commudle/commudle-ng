import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IHackathonUserResponse } from '@commudle/shared-models';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';

@Component({
  selector: 'commudle-user-details-form',
  templateUrl: './user-details-form.component.html',
  styleUrls: ['./user-details-form.component.scss'],
})
export class UserDetailsFormComponent implements OnInit {
  @Input() userFormDetails;
  @Input() showActionButtons = true;
  @Input() hackathonUserResponse: IHackathonUserResponse;
  @Input() submitButtonText = 'Next';
  @Output() submitUserDetailsEvent = new EventEmitter<any>();

  currentUser: ICurrentUser;
  userForm: FormGroup;
  uploadedProfilePictureFile: File;
  uploadedProfilePicture: any;
  faFileImage = faFileImage;

  constructor(
    private authWatchService: LibAuthwatchService,
    private fb: FormBuilder,
    private toastLogService: LibToastLogService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((data) => {
      this.currentUser = data;
      this.uploadedProfilePicture = this.currentUser.avatar;
      this.userForm = this.createForm(this.userFormDetails);
    });
  }

  createForm(userDetails: any): FormGroup {
    const formGroupConfig: any = {};

    // Dynamically add form controls based on configuration
    Object.keys(userDetails).forEach((key) => {
      if (userDetails[key] && key !== 'profile_image') {
        let userValues = this.currentUser[key];
        if (key === 'work_experience_months') {
          userValues = userValues / 12;
        }
        if (this.hackathonUserResponse) {
          formGroupConfig[key] = [
            this.hackathonUserResponse && this.hackathonUserResponse[key]
              ? this.hackathonUserResponse[key]
              : userValues,
            Validators.required,
          ];
        } else {
          formGroupConfig[key] = [userValues, Validators.required];
        }
      }
    });

    return this.fb.group(formGroupConfig);
  }

  submitUserDetails() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }
    this.submitUserDetailsEvent.emit(this.userForm.value);
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
}
