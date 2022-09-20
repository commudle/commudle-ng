import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ICurrentUser } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { BehaviorSubject } from 'rxjs';
import { StepperComponent } from 'apps/commudle-admin/src/app/components/stepper/stepper.component';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private profileWeights: Object = {
    username: 10,
    avatar: 10,
    name: 10,
    designation: 10,
    about_me: 10,
    location: 10,
    gender: 10,
    skills: 20,
    socialLinks: 10,
  };

  private socialLinks = [
    'personal_website',
    'github',
    'linkedin',
    'twitter',
    'youtube',
    'medium',
    'dribble',
    'behance',
    'gitlab',
    'facebook',
  ];

  currentUser: ICurrentUser;
  dialogRef: NbDialogRef<any>;

  private profileCompletePercentage: BehaviorSubject<number> = new BehaviorSubject(0);
  public profileCompletePercentage$ = this.profileCompletePercentage.asObservable();

  constructor(private dialogService: NbDialogService, private authWatchService: LibAuthwatchService) {}

  getProfilePercentage() {
    this.authWatchService.currentUser$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      if (this.currentUser) {
        this.calculateProfilePercentage();
      }
    });
  }

  calculateProfilePercentage() {
    let profilePercentage = 0;

    if (this.currentUser.tags.length >= 1) {
      profilePercentage += this.profileWeights['skills'];
    }

    let socialLinksPresent = 0;

    for (const link of this.socialLinks) {
      if (this.currentUser[link]) {
        socialLinksPresent += 1;
      }
    }

    if (socialLinksPresent >= 3) {
      profilePercentage += this.profileWeights['socialLinks'];
    }

    for (const field in this.profileWeights) {
      if (this.currentUser[field]) {
        profilePercentage += this.profileWeights[field];
      }
    }
    this.profileCompletePercentage.next(profilePercentage);
  }

  showStepper() {
    this.dialogRef = this.dialogService.open(StepperComponent, {
      hasScroll: true,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }
}
