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
import { DomSanitizer, Meta, SafeHtml, Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { LabsService } from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { ICurrentUser } from 'projects/shared-models/current_user.model';
import { ILabStep } from 'projects/shared-models/lab-step.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { PrismJsHighlightCodeService } from 'projects/shared-services/prismjs-highlight-code.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lab-step',
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
    private title: Title,
    private meta: Meta,
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
          this.stepDescription = this.sanitizer.bypassSecurityTrustHtml(this.step.description);
          this.triggerDialogB = false;
          this.addLabStepVisit();
          this.setMeta();
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

  setMeta() {
    this.title.setTitle(`${this.step.name}`);
    this.meta.updateTag({
      name: 'description',
      content: this.step.description.replace(/<[^>]*>/g, '').substring(0, 160),
    });

    this.meta.updateTag({
      name: 'og:title',
      content: `${this.step.name}`,
    });
    this.meta.updateTag({
      name: 'og:description',
      content: this.step.description.replace(/<[^>]*>/g, '').substring(0, 160),
    });

    this.meta.updateTag({
      name: 'twitter:title',
      content: `${this.step.name}`,
    });
    this.meta.updateTag({
      name: 'twitter:description',
      content: this.step.description.replace(/<[^>]*>/g, '').substring(0, 160),
    });
  }

  addLabStepVisit() {
    if (this.currentUser) {
      this.labsService.addLabStepVisit(this.step.id).subscribe();
    }
  }
}
