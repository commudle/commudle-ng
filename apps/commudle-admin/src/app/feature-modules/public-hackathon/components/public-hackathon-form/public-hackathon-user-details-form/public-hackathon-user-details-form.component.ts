import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { IHackathonResponseGroup } from 'apps/shared-models/hackathon-response-group.model';
import { IHackathonUserResponse } from 'apps/shared-models/hackathon-user-response.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { faFileImage } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'commudle-public-hackathon-user-details-form',
  templateUrl: './public-hackathon-user-details-form.component.html',
  styleUrls: ['./public-hackathon-user-details-form.component.scss'],
})
export class PublicHackathonUserDetailsFormComponent implements OnInit {
  @Input() hackathonResponseGroup: IHackathonResponseGroup;
  @Input() hackathonUserResponse: IHackathonUserResponse;
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
      this.hackathonUserResponse;
      this.userForm = this.createForm(this.hackathonResponseGroup.user_details);
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
        formGroupConfig[key] = [
          this.hackathonUserResponse && this.hackathonUserResponse[key] ? this.hackathonUserResponse[key] : userValues,
          Validators.required,
        ];
      }
    });

    return this.fb.group(formGroupConfig);
  }

  submitUserDetails() {
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
