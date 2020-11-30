import { Component, OnInit, Output, EventEmitter, Input, Pipe } from '@angular/core';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppUsersService } from '../../../services/app-users.service';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { debounceTime, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-basic-user-profile',
  templateUrl: './basic-user-profile.component.html',
  styleUrls: ['./basic-user-profile.component.scss']
})
export class BasicUserProfileComponent implements OnInit {
  currentUser: ICurrentUser;
  uploadedProfilePicture: any;
  uploadedProfilePictureFile: File;
  validusername = false;
  currentUsername = '';
  changeUsername = false;

  userProfileForm = this.fb.group({
    name: ['', Validators.required],
    about_me: ['', Validators.required],
    designation: ['', Validators.required],
    phone: [''],
    gender: [''],
    personal_website: [''],
    github: [''],
    linkedin: [''],
    twitter: ['']
  });

  usernameForm = this.fb.group({
    username: ['', Validators.required]
  })

  constructor(
    private authWatchService: LibAuthwatchService,
    private fb: FormBuilder,
    private usersService: AppUsersService,
    private toastLogService: LibToastLogService
  ) { }

  ngOnInit() {
    this.authWatchService.currentUser$.subscribe(currentUser => {
      if (currentUser) {
        this.currentUser = currentUser;
        this.userProfileForm.patchValue(this.currentUser);
        this.uploadedProfilePicture = this.currentUser.avatar;

        if (!this.currentUser.username) {
          this.changeUsername = true;
        }
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
      reader.onload = (e: any) => {
        this.uploadedProfilePicture = reader.result;
      };

      reader.readAsDataURL(file);
    }

  }


  updateUserDetails() {
    const formData: any = new FormData();
    const userFormData = this.userProfileForm.value;
    Object.keys(userFormData).forEach(
      key => (!(userFormData[key] == null) ? formData.append(`user[${key}]`, userFormData[key]) : '')
      );

    if (this.uploadedProfilePictureFile != null) {
      formData.append('user[profile_image]', this.uploadedProfilePictureFile);
    }

    this.usersService.updateUserProfile(formData).subscribe(
      data => {
        this.authWatchService.updateSignedInUser();
        this.toastLogService.successDialog("Your Profile is now updated!");
      }
    );
  }


  checkUsername() {
    this.usernameForm.valueChanges.pipe(
      debounceTime(800),
      switchMap(() => {

        return this.usersService.checkUsername(this.usernameForm.get('username').value);
      })
    ).subscribe((data) => {
      if (data == true) {
        this.validusername = true;
      } else {
        this.validusername = false;
      }
    });
  }

  setUsername() {
    let newUsername = this.usernameForm.get('username').value;
    this.usersService.setUsername(newUsername).subscribe(
      data => {
        if (data == newUsername) {
          this.toastLogService.successDialog('Updated!');
          // get the user again from the server
          this.authWatchService.checkAlreadySignedIn().subscribe();
        }
      }
    )
  }

}
