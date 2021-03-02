import {AfterViewChecked, Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {LabsService} from 'projects/commudle-admin/src/app/feature-modules/labs/services/labs.service';
import {ILab} from 'projects/shared-models/lab.model';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, Meta, Title} from '@angular/platform-browser';
import {DiscussionsService} from 'projects/commudle-admin/src/app/services/discussions.service';
import {IDiscussion} from 'projects/shared-models/discussion.model';
import {DOCUMENT} from '@angular/common';
import {PrismJsHighlightCodeService} from 'projects/shared-services/prismjs-highlight-code.service';
import {NbDialogService} from '@nebular/theme';
import {Subscription} from 'rxjs';


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
  selectedLabStep = -1;
  lastVisitedStepId;
  discussionChat: IDiscussion;
  codeHighlighted = false;

  @ViewChild('introCon') private iContent: ElementRef;
  @ViewChild('dialog') private dialog: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private meta: Meta,
    private title: Title,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private router: Router,
    private discussionsService: DiscussionsService,
    @Inject(DOCUMENT) private doc: Document,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService,
    private dialogService: NbDialogService
  ) {
  }

  ngOnInit() {
    this.routeSubscriptions.push(
      this.activatedRoute.params.subscribe(data => {
        this.getLab(data.lab_id);
      })
    );
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
    this.routeSubscriptions.forEach(subscription => subscription.unsubscribe());
  }

  highlightCodeSnippets() {
    if (!this.codeHighlighted) {
      this.prismJsHighlightCodeService.highlightAll();
      this.codeHighlighted = true;
    }
  }

  setMeta() {
    this.meta.updateTag({
      name: 'description',
      content: this.lab.description.replace(/<[^>]*>/g, '').substring(0, 200)
    });
    this.title.setTitle(`${this.lab.name} | By ${this.lab.user.name}`);
    this.meta.updateTag({
      name: 'og:image',
      content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
    });
    this.meta.updateTag({
      name: 'og:image:secure_url',
      content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
    });
    this.meta.updateTag({name: 'og:title', content: `${this.lab.name} | By ${this.lab.user.name}`});
    this.meta.updateTag({
      name: 'og:description',
      content: this.lab.description.replace(/<[^>]*>/g, '').substring(0, 200)
    });
    this.meta.updateTag({name: 'og:type', content: 'article'});
    this.meta.updateTag({
      name: 'twitter:image',
      content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
    });
    this.meta.updateTag({name: 'twitter:title', content: `${this.lab.name} | By ${this.lab.user.name}`});
    this.meta.updateTag({
      name: 'twitter:description',
      content: this.lab.description.replace(/<[^>]*>/g, '').substring(0, 200)
    });
  }

  scrollToTop() {
    window.scrollTo({top: 0, behavior: 'smooth'});
  }

  getLab(labId) {
    this.labsService.pShow(labId).subscribe(data => {
      this.lab = data;
      this.setMeta();
      this.labDescription = this.sanitizer.bypassSecurityTrustHtml(this.lab.description);
      this.triggerDialogB = false;
      this.lastVisitedStepId = this.lab.last_visited_step_id;
      this.getDiscussionChat();
      this.highlightCodeSnippets();

      if (this.activatedRoute.firstChild) {
        this.routeSubscriptions.push(
          this.activatedRoute.firstChild.params.subscribe(value => {
            if (value.step_id) {
              this.selectedLabStep = this.lab.lab_steps.findIndex(k => k.id === value.step_id);
              this.setStep(this.selectedLabStep);
            }
          })
        );
      }
    });
  }

  ngAfterViewChecked() {
    if (!this.triggerDialogB) {
      if (this.iContent) {
        const imagesList = this.iContent.nativeElement.querySelectorAll('img');
        for (const img of imagesList) {
          const g0 = img;
          g0.classList.add('clickable');
          g0.addEventListener('click', () => {
            this.src = g0.src;
            this.dialogService.open(this.dialog);
          }, false);
        }
        this.triggerDialogB = true;
      }
    }
  }

  setStep(index) {
    this.scrollToTop();
    this.lastVisitedStepId = null;
    this.selectedLabStep = index;
  }

  changeStep(count) {
    this.scrollToTop();
    this.selectedLabStep += count;
    this.lastVisitedStepId = null;
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForLabChat(this.lab.id).subscribe(data => this.discussionChat = data);
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
  }

}
