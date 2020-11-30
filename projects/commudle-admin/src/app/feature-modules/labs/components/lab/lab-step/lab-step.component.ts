import { DomSanitizer } from '@angular/platform-browser';
import { Component, OnInit, Input, OnDestroy, AfterViewChecked} from '@angular/core';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { LabsService } from '../../../services/labs.service';
import { PrismJsHighlightCodeService } from 'projects/shared-services/prismjs-highlight-code.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-lab-step',
  templateUrl: './lab-step.component.html',
  styleUrls: ['./lab-step.component.scss']
})
export class LabStepComponent implements OnInit, OnDestroy, AfterViewChecked {
  @Input() step: ILabStep;
  subscriptions = []
  currentUser;
  stepDescription;
  codeHighlighted = false;

  constructor(
    private authWatchService: LibAuthwatchService,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe(
        data => {
          this.currentUser = data;
        }
      )
    );

    this.subscriptions.push(
      this.activatedRoute.params.subscribe(data => {
        this.labsService.pGetStep(data.step_id).subscribe(
          stepData => {
            this.step = stepData;
            this.stepDescription = this.sanitizer.bypassSecurityTrustHtml(this.step.description);
            this.addLabStepVisit();
          }
        );
      })
    );

  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    for (const subs of this.subscriptions) {
      subs.unsubscribe();
    }

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
