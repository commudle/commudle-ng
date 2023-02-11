import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfileStatusBarService } from 'apps/commudle-admin/src/app/services/profile-status-bar.service';
import { StepperService } from 'apps/commudle-admin/src/app/services/stepper.service';

@Component({
  selector: 'app-profile-status-bar',
  templateUrl: './profile-status-bar.component.html',
  styleUrls: ['./profile-status-bar.component.scss'],
})
export class ProfileStatusBarComponent implements OnInit {
  value = 0;

  constructor(
    private stepperService: StepperService,
    private profileStatusBarService: ProfileStatusBarService,
    private activeRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.stepperService.getProfilePercentage();
    this.stepperService.profileCompletePercentage$.subscribe((percentage) => {
      this.value = percentage;
      if (percentage >= 90) {
        this.profileStatusBarService.changeProfileBarStatus(false);
      } else {
        this.profileStatusBarService.changeProfileBarStatus(true);
        if (this.activeRoute.snapshot.queryParams['show-profile-complete-popup'] === 'true') {
          this.stepperService.showStepper();
        }
      }
    });
  }

  showStepper() {
    this.stepperService.showStepper();
  }
}
