import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { LibToastLogService } from 'apps/shared-services/lib-toastlog.service';
import { UpdateProfileService } from 'apps/commudle-admin/src/app/feature-modules/users/services/update-profile.service';
import { AppUsersService } from 'apps/commudle-admin/src/app/services/app-users.service';
import { HttpClient } from '@angular/common/http';
import { ApiRoutesService } from 'apps/shared-services/api-routes.service';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'apps/shared-services/api-routes.constants';
import { IUser } from 'apps/shared-models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserProfileManagerService {
  private updateUsername: BehaviorSubject<boolean> = new BehaviorSubject(false);
  public updateUsername$ = this.updateUsername.asObservable();

  private user: BehaviorSubject<IUser> = new BehaviorSubject<IUser>(null);
  public user$ = this.user.asObservable();

  userProfileForm;

  uploadedProfilePictureFile: File;

  constructor(
    private fb: FormBuilder,
    private usersService: AppUsersService,
    private toastLogService: LibToastLogService,
    private updateProfileService: UpdateProfileService,
    private authWatchService: LibAuthwatchService,
    private http: HttpClient,
    private apiRoutesService: ApiRoutesService,
  ) {
    this.userProfileForm = this.fb.group({
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
  }

  setUpdateUsername(value: boolean) {
    this.updateUsername.next(value);
  }

  updateUserDetails(showToast: boolean) {
    const formData: any = new FormData();
    //removing extra new lines from the about_me input
    this.userProfileForm.patchValue({
      about_me: this.userProfileForm.get('about_me').value.replace(/[\n]+/g, '\n').trim(),
    });
    const userFormData = this.userProfileForm.value;
    Object.keys(userFormData).forEach((key) =>
      !(userFormData[key] == null) ? formData.append(`user[${key}]`, userFormData[key]) : '',
    );

    if (this.uploadedProfilePictureFile != null) {
      formData.append('user[profile_image]', this.uploadedProfilePictureFile);
    }

    this.usersService.updateUserProfile(formData).subscribe(() => {
      this.authWatchService.updateSignedInUser();
      if (showToast) {
        this.toastLogService.successDialog(`Your Profile is now updated!`);
      }
      this.updateProfileService.setUpdateProfileStatus(true);
    });
  }

  toggleEmployee(): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.USERS.TOGGLE_EMPLOYEE_ROLE), {});
  }
  toggleEmployer(): Observable<any> {
    return this.http.post<any>(this.apiRoutesService.getRoute(API_ROUTES.USERS.TOGGLE_EMPLOYER_ROLE), {});
  }

  getProfile(username) {
    this.usersService.getProfile(username).subscribe((data) => {
      this.user.next(data);
    });
  }
}
