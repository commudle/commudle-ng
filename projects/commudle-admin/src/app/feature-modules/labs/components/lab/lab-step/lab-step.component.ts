import { DomSanitizer } from '@angular/platform-browser';
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
  stepDescription;

  constructor(
    private authWatchService: LibAuthwatchService,
    private labsService: LabsService,
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.stepDescription = this.sanitizer.bypassSecurityTrustHtml(this.step.description);
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
