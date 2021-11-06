import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { UserProfileManagerService } from 'projects/commudle-admin/src/app/feature-modules/users/services/user-profile-manager.service';
import { faBehance, faDribbble, faFacebook, faGitlab, faMediumM, faYoutube } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-social-links',
  templateUrl: './social-links.component.html',
  styleUrls: ['./social-links.component.scss'],
})
export class SocialLinksComponent implements OnInit {
  currentUser: ICurrentUser;

  socialLinksForm = this.fb.group({
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
    private fb: FormBuilder,
    private authWatchService: LibAuthwatchService,
    private userProfileManagerService: UserProfileManagerService,
  ) {}

  ngOnInit(): void {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      if (currentUser) {
        this.currentUser = currentUser;
        this.socialLinksForm.patchValue(this.currentUser);
        this.userProfileManagerService.userProfileForm.patchValue(this.socialLinksForm.value); // initial changes
      }
    });

    this.socialLinksForm.valueChanges.subscribe((value) => {
      this.userProfileManagerService.userProfileForm.patchValue(value);
    });
  }
}
