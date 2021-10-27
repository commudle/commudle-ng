import { Component, OnInit } from '@angular/core';
import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-profile-status-bar',
  templateUrl: './profile-status-bar.component.html',
  styleUrls: ['./profile-status-bar.component.scss'],
})
export class ProfileStatusBarComponent implements OnInit {
  value = 0;

  constructor(private stepperService: StepperService) {}

  ngOnInit(): void {
    this.stepperService.getProfilePercentage();
    this.stepperService.profileCompletePercentage$.subscribe((percentage) => {
      this.value = percentage;
    });
  }

  showStepper() {
    this.stepperService.showStepper();
  }
}
