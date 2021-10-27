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
  // user basic info = 70% , total fields = 7, each weight = 10
  // social links = 30%, total fields = 10, each weight = 3
  private profileWeights: Object = {
    username: 10,
    avatar: 10,
    name: 10,
    designation: 10,
    about_me: 10,
    location: 10,
    gender: 10,
    personal_website: 3,
    github: 3,
    linkedin: 3,
    twitter: 3,
    youtube: 3,
    medium: 3,
    dribbble: 3,
    behance: 3,
    gitlab: 3,
    facebook: 3,
  };

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
    for (const field in this.profileWeights) {
      if (this.currentUser[field]) {
        profilePercentage += this.profileWeights[field];
      }
    }
    this.profileCompletePercentage.next(profilePercentage);
  }

  showStepper() {
    this.dialogRef = this.dialogService.open(StepperComponent, { hasScroll: true });
  }
}
