import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LabsService } from 'apps/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { ICurrentUser } from '@commudle/shared-models';
import { ILabStep } from '@commudle/shared-models';
import { LibAuthwatchService } from '@commudle/shared-services';
import { PrismJsHighlightCodeService } from '@commudle/shared-services';
import { SeoService } from '@commudle/shared-services';
import { Subscription } from 'rxjs';

@Component({
  selector: 'commudle-lab-step',
  templateUrl: './lab-step.component.html',
  styleUrls: ['./lab-step.component.scss'],
})
export class LabStepComponent implements OnInit, OnDestroy, AfterViewChecked {
  public src;

  step: ILabStep;
  currentUser: ICurrentUser;
  stepDescription: SafeHtml;
  triggerDialogB = false;

  subscriptions: Subscription[] = [];

  @ViewChild('content') private content: ElementRef;
  @ViewChild('dialog') private dialog: any;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private authWatchService: LibAuthwatchService,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService,
    private activatedRoute: ActivatedRoute,
    private dialogService: NbDialogService,
    private seoService: SeoService,
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      this.authWatchService.currentUser$.subscribe((data: ICurrentUser) => {
        this.currentUser = data;
      }),
    );

    this.subscriptions.push(
      this.activatedRoute.params.subscribe((data: Params) => {
        this.labsService.pGetStep(data.step_id).subscribe((stepData: ILabStep) => {
          this.step = stepData;

          this.seoService.setTags(
            `${this.step.name}`,
            this.step.description.replace(/<[^>]*>/g, '').substring(0, 160),
            'https://commudle.com/assets/images/commudle-logo192.png',
          );

          this.stepDescription = this.sanitizer.bypassSecurityTrustHtml(this.step.description);
          this.triggerDialogB = false;
          this.addLabStepVisit();
        });
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  ngAfterViewChecked() {
    if (this.isBrowser) {
      if (!this.triggerDialogB) {
        if (this.content) {
          const imagesList = this.content.nativeElement.querySelectorAll('img');
          for (const img of imagesList) {
            const g0 = img;
            g0.classList.add('clickable');
            g0.addEventListener(
              'click',
              () => {
                this.src = g0.src;
                this.dialogService.open(this.dialog);
              },
              false,
            );
          }
          this.triggerDialogB = true;
        }
      }
    }
  }

  addLabStepVisit() {
    if (this.currentUser) {
      this.labsService.addLabStepVisit(this.step.id).subscribe();
    }
  }
}
