import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { faBehance, faDribbble, faFacebook, faGitlab, faMediumM, faYoutube } from '@fortawesome/free-brands-svg-icons';
import {
  UserProfileManagerService
} from 'apps/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent implements OnInit {
  @Output() socialLinksFormValidity: EventEmitter<boolean> = new EventEmitter<boolean>();

  currentUser: ICurrentUser;

  socialLinksForm;

  faYoutube = faYoutube;
  faMediumM = faMediumM;
  faDribbble = faDribbble;
  faBehance = faBehance;
  faGitlab = faGitlab;
  faFacebook = faFacebook;

  constructor(
    private fb: FormBuilder,
    private authWatchService: LibAuthwatchService,
    private userProfileManagerService: UserProfileManagerService,
  ) {
    this.socialLinksForm = this.fb.group({
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

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
        this.socialLinksForm.patchValue(this.currentUser);
        this.socialLinksFormValidity.emit(this.socialLinksForm.valid); // initial
        this.userProfileManagerService.userProfileForm.patchValue(this.socialLinksForm.value); // initial changes
      }
    });

    this.socialLinksForm.valueChanges.subscribe((value) => {
      this.userProfileManagerService.userProfileForm.patchValue(value);
      this.socialLinksFormValidity.emit(this.socialLinksForm.valid); // whenever form value changes check validity
    });
  }
}
