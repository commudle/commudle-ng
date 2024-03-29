import { Injectable } from '@angular/core';
import { NbDialogRef, NbDialogService } from '@commudle/theme';
import { ICurrentUser } from 'apps/shared-models/current_user.model';
import { LibAuthwatchService } from 'apps/shared-services/lib-authwatch.service';
import { BehaviorSubject } from 'rxjs';
import { StepperComponent } from 'apps/commudle-admin/src/app/components/stepper/stepper.component';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private profileWeights: Record<string, number> = {
    username: 5,
    avatar: 10,
    name: 5,
    designation: 20,
    about_me: 15,
    location: 10,
    gender: 10,
    skills: 25,
    // socialLinks: 10,
  };

  // private socialLinks = [
  //   'personal_website',
  //   'github',
  //   'linkedin',
  //   'twitter',
  //   'youtube',
  //   'medium',
  //   'dribble',
  //   'behance',
  //   'gitlab',
  //   'facebook',
  // ];

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

    // let socialLinksPresent = 0;

    // for (const link of this.socialLinks) {
    //   if (this.currentUser[link]) {
    //     socialLinksPresent += 1;
    //   }
    // }

    // if (socialLinksPresent >= 3) {
    //   profilePercentage += this.profileWeights['socialLinks'];
    // }

    for (const field in this.profileWeights) {
      if (this.currentUser[field]) {
        profilePercentage += this.profileWeights[field];
      }
    }
    this.profileCompletePercentage.next(profilePercentage);
  }

  showStepper() {
    this.dialogRef = this.dialogService.open(StepperComponent, {
      hasScroll: false,
      closeOnBackdropClick: false,
      closeOnEsc: false,
    });
  }
}
