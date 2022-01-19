import { DOCUMENT, isPlatformBrowser } from '@angular/common';
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
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationStart, Router } from '@angular/router';
import { NbDialogService, NbSidebarService } from '@nebular/theme';
import { LabsService } from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { FooterService } from 'projects/commudle-admin/src/app/services/footer.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { ILab } from 'projects/shared-models/lab.model';
import { PrismJsHighlightCodeService } from 'projects/shared-services/prismjs-highlight-code.service';
import { Subscription } from 'rxjs';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';
import { NavigatorShareService } from 'projects/shared-services/navigator-share.service';
import { Clipboard } from '@angular/cdk/clipboard';
import { environment } from 'projects/commudle-admin/src/environments/environment';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit, OnDestroy, AfterViewChecked {
  public src;

  routeSubscriptions: Subscription[] = [];
  labDescription;
  triggerDialogB = false;
  lab: ILab;
  similarLabs: ILab[] = [];
  selectedLabStep = -1;
  lastVisitedStepId: number;
  discussionChat: IDiscussion;
  messagesCount: number;
  window: Window = window;

  @ViewChild('introCon') private iContent: ElementRef;
  @ViewChild('dialog') private dialog: any;

  private isBrowser: boolean = isPlatformBrowser(this.platformId);

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    @Inject(DOCUMENT) private doc: Document,
    private activatedRoute: ActivatedRoute,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private discussionsService: DiscussionsService,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService,
    private dialogService: NbDialogService,
    private footerService: FooterService,
    private nbSidebarService: NbSidebarService,
    private navigatorShareService: NavigatorShareService,
    private libToastLogService: LibToastLogService,
    private clipboard: Clipboard,
    private seoService: SeoService,
  ) {}

  // we are calling setStep function and that in turn is calling window.scrollTo() function and since window isn't
  // defined on the server side, we need isBrowser
  ngOnInit() {
    this.routeSubscriptions.push(
      this.activatedRoute.params.subscribe((data) => {
        this.getLab(data.lab_id);
        this.setStep(-1);
      }),
    );

    // Listen for url changes
    this.router.events.subscribe((event: NavigationStart) => {
      if (event.navigationTrigger === 'popstate') {
        // Get step id from url
        const stepId = parseInt(event.url.split('/').pop(), 10);
        if (isNaN(stepId)) {
          // Navigation between a step and overview
          this.setStep(-1);
        } else {
          // Navigation between steps
          this.selectedLabStep = this.lab.lab_steps.findIndex((k) => k.id === stepId);
        }
      }
    });

    // Hide Footer
    this.footerService.changeFooterStatus(false);
  }

  // ngAfterViewChecked() would be invoked once the DOM tree gets any change, so since we are building the HTML on the
  // server side, the DOM changes and hence the ngAfterViewChecked() will be called and that's why we need isBrowser
  ngAfterViewChecked() {
    if (this.isBrowser) {
      if (!this.triggerDialogB) {
        if (this.iContent) {
          const imagesList = this.iContent.nativeElement.querySelectorAll('img');
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
      this.highlightCodeSnippets();
    }
  }

  // Called once, before the instance is destroyed.
  ngOnDestroy(): void {
    this.routeSubscriptions.forEach((subscription) => subscription.unsubscribe());

    // Show Footer
    this.footerService.changeFooterStatus(true);
  }

  highlightCodeSnippets() {
    this.prismJsHighlightCodeService.highlightAll();
  }

  scrollToTop() {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  getLab(labId) {
    this.labsService.pShow(labId).subscribe((data) => {
      this.lab = data;
      this.seoService.setTags(
        `${this.lab.name} | By ${this.lab.user.name}`,
        this.lab.description.replace(/<[^>]*>/g, '').substring(0, 160),
        this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png',
        'article',
      );
      this.labDescription = this.sanitizer.bypassSecurityTrustHtml(this.lab.description);
      this.triggerDialogB = false;
      this.lastVisitedStepId = this.lab.last_visited_step_id;
      this.getDiscussionChat();
      // Get only published labs
      this.labsService.getSimilarLabs(this.lab.id).subscribe((value) => {
        this.similarLabs = [];
        value.labs.forEach((similarLab) => {
          if (
            similarLab.publish_status === 'published' &&
            similarLab.id !== this.lab.id &&
            this.similarLabs.length < 4
          ) {
            this.similarLabs.push(similarLab);
          }
        });
      });

      if (this.activatedRoute.firstChild) {
        this.routeSubscriptions.push(
          this.activatedRoute.firstChild.params.subscribe((value) => {
            if (value.step_id) {
              this.selectedLabStep = this.lab.lab_steps.findIndex((k) => k.id === parseInt(value.step_id, 10));
              this.setStep(this.selectedLabStep);
            }
          }),
        );
      }
    });
  }

  setStep(index) {
    this.scrollToTop();
    this.lastVisitedStepId = null;
    this.selectedLabStep = index;
    this.highlightCodeSnippets();
  }

  changeStep(count) {
    this.scrollToTop();
    this.selectedLabStep += count;
    this.lastVisitedStepId = null;
    this.highlightCodeSnippets();
    if (this.selectedLabStep === -1) {
      this.router.navigate(['/labs', this.lab.slug]);
    }
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForLabChat(this.lab.id).subscribe((data) => (this.discussionChat = data));
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
  }

  getMessagesCount(count: number) {
    this.messagesCount = count;
  }

  toggleDetails() {
    this.nbSidebarService.toggle(false, 'labMenu');
  }

  copyTextToClipboard(lab: ILab): void {
    if (!this.navigatorShareService.canShare()) {
      if (this.clipboard.copy(`${environment.app_url}/labs/${lab.slug}`)) {
        this.libToastLogService.successDialog('Copied Lab successfully!');
      }
      return;
    }

    this.navigatorShareService
      .share({
        title: `${lab.name}`,
        url: `${environment.app_url}/labs/${lab.slug}`,
      })
      .then(() => {
        this.libToastLogService.successDialog('Shared successfully!');
      });
  }
}
