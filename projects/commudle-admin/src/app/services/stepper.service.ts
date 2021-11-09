import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@nebular/theme';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { BehaviorSubject } from 'rxjs';
import { StepperComponent } from 'projects/commudle-admin/src/app/components/stepper/stepper.component';

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

    if (this.currentUser.tags.length >= 5) {
      profilePercentage += this.profileWeights['skills'];
    }

    for (const link of this.socialLinks) {
      //if any one link is present add 10%
      if (this.currentUser[link]) {
        profilePercentage += this.profileWeights['socialLinks'];
        break;
      }
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
