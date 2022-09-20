import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ProfileStatusBarService } from 'apps/commudle-admin/src/app/services/profile-status-bar.service';
import { StepperService } from 'apps/commudle-admin/src/app/services/stepper.service';

@Component({
  selector: 'commudle-profile-status-bar',
  templateUrl: './profile-status-bar.component.html',
  styleUrls: ['./profile-status-bar.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProfileStatusBarComponent implements OnInit {
  value = 0;

  constructor(private stepperService: StepperService, public profileStatusBarService: ProfileStatusBarService) {}

  ngOnInit(): void {
    this.stepperService.getProfilePercentage();
    this.stepperService.profileCompletePercentage$.subscribe((percentage) => {
      this.value = percentage;
      this.profileStatusBarService.setProfileBarStatus(percentage >= 90);
    });
  }

  showStepper() {
    this.stepperService.showStepper();
  }
}
