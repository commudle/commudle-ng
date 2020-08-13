import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, OnDestroy, AfterViewChecked, OnChanges } from '@angular/core';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LabsService } from '../../../services/labs.service';
import { PrismJsHighlightCodeService } from 'projects/shared-services/prismjs-highlight-code.service';

@Component({
  selector: 'app-lab-step',
  templateUrl: './lab-step.component.html',
  styleUrls: ['./lab-step.component.scss']
})
export class LabStepComponent implements OnInit, OnChanges, OnDestroy, AfterViewChecked {
  @Input() step: ILabStep;
  userSubscription;
  currentUser;
  stepDescription;
  codeHighlighted = false;

  constructor(
    private authWatchService: LibAuthwatchService,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authWatchService.currentUser$.subscribe(
      data => {
        this.currentUser = data;
      }
    );
  }

  ngOnChanges() {
    this.stepDescription = this.sanitizer.bypassSecurityTrustHtml(this.step.description);
    this.addLabStepVisit();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.userSubscription.unsubscribe();

  }

  ngAfterViewChecked() {
    if (!this.codeHighlighted) {
      this.prismJsHighlightCodeService.highlightAll();
      this.codeHighlighted = true;
    }
  }

  addLabStepVisit() {
    if (this.currentUser) {
      this.labsService.addLabStepVisit(this.step.id).subscribe();
    }
  }
}
