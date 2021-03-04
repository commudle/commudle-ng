import {DomSanitizer} from '@angular/platform-browser';
import {AfterViewChecked, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ILabStep} from 'projects/shared-models/lab-step.model';
import {LibAuthwatchService} from 'projects/shared-services/lib-authwatch.service';
import {LabsService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import {PrismJsHighlightCodeService} from 'projects/shared-services/prismjs-highlight-code.service';
import {ActivatedRoute} from '@angular/router';
import {NbDialogService} from '@nebular/theme';
import {ICurrentUser} from 'projects/shared-models/current_user.model';
import {Subscription} from 'rxjs';


@Component({
  selector: 'app-lab-step',
  templateUrl: './lab-step.component.html',
  styleUrls: ['./lab-step.component.scss']
})

export class LabStepComponent implements OnInit, OnDestroy, AfterViewChecked {

  public src;

  @Input() step: ILabStep;

  subscriptions: Subscription[] = [];
  currentUser: ICurrentUser;
  stepDescription;
  triggerDialogB = false;

  @ViewChild('content') private content: ElementRef;
  @ViewChild('dialog') private dialog: any;

  constructor(
    private authWatchService: LibAuthwatchService,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService
  ) {
  }

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
            this.triggerDialogB = false;
            this.addLabStepVisit();
          }
        );
      })
    );
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  ngAfterViewChecked() {
    if (!this.triggerDialogB) {
      if (this.content) {
        const imagesList = this.content.nativeElement.querySelectorAll('img');
        for (const img of imagesList) {
          const g0 = img;
          g0.classList.add('clickable');
          g0.addEventListener('click', () => {
            this.src = g0.src;
            this.dialogService.open(this.dialog)
          }, false);
        }
        this.triggerDialogB = true;
      }
    }
  }

  addLabStepVisit() {
    if (this.currentUser) {
      this.labsService.addLabStepVisit(this.step.id).subscribe();
    }
  }
}
