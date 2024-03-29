import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GoogleTagManagerService } from 'apps/commudle-admin/src/app/services/google-tag-manager.service';
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
    private activatedRoute: ActivatedRoute,
    private gtm: GoogleTagManagerService,
  ) {}

  ngOnInit(): void {
    this.stepperService.getProfilePercentage();
    this.stepperService.profileCompletePercentage$.subscribe((percentage) => {
      this.value = percentage;
      if (percentage >= 90) {
        this.profileStatusBarService.changeProfileBarStatus(false);
      } else {
        this.profileStatusBarService.changeProfileBarStatus(true);
        if (this.activatedRoute.snapshot.queryParams['show-profile-complete-popup'] === 'true') {
          this.stepperService.showStepper();
        }
      }
    });
  }

  showStepper() {
    this.stepperService.showStepper();
    this.gtm.dataLayerPushEvent('click_open_complete_profile_popup', {});
  }
}
