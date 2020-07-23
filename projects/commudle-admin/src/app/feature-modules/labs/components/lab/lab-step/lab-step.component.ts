import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LabsService } from '../../../services/labs.service';

@Component({
  selector: 'app-lab-step',
  templateUrl: './lab-step.component.html',
  styleUrls: ['./lab-step.component.scss']
})
export class LabStepComponent implements OnInit, OnDestroy {
  @Input() step: ILabStep;
  userSubscription;
  currentUser;

  constructor(
    private authWatchService: LibAuthwatchService,
    private labsService: LabsService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authWatchService.currentUser$.subscribe(
      data => {
        this.currentUser = data;
        this.addLabStepVisit();
      }
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();

  }

  addLabStepVisit() {
    if (this.currentUser) {
      this.labsService.addLabStepVisit(this.step.id).subscribe();
    }
  }
}
