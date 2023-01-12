import { Component, OnInit } from '@angular/core';
import { ProfileStatusBarService } from 'apps/commudle-admin/src/app/services/profile-status-bar.service';
import { StepperService } from 'apps/commudle-admin/src/app/services/stepper.service';

@Component({
  selector: 'app-profile-status-bar',
  templateUrl: './profile-status-bar.component.html',
  styleUrls: ['./profile-status-bar.component.scss'],
})
export class ProfileStatusBarComponent implements OnInit {
  value = 0;

  constructor(private stepperService: StepperService, private profileStatusBarService: ProfileStatusBarService) {}

  ngOnInit(): void {
    this.stepperService.getProfilePercentage();
    this.stepperService.profileCompletePercentage$.subscribe((percentage) => {
      this.value = percentage;
      if (percentage >= 90) {
        this.profileStatusBarService.changeProfileBarStatus(false);
      } else {
        this.profileStatusBarService.changeProfileBarStatus(true);
      }
    });
  }

  showStepper() {
    this.stepperService.showStepper();
  }
}
