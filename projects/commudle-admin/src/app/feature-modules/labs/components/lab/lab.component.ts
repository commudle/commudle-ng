import { Component, OnInit, OnDestroy, Inject, ViewChild, ElementRef, AfterViewChecked, ViewChildren } from '@angular/core';
import { LabsService } from '../../services/labs.service';
import { ILab } from 'projects/shared-models/lab.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';
import { DOCUMENT } from '@angular/common';
import { PrismJsHighlightCodeService } from 'projects/shared-services/prismjs-highlight-code.service';
import { NbDialogService } from '@nebular/theme';



@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit, OnDestroy {

  @ViewChild('introCon')private iContent:ElementRef;
  @ViewChild('dialog')private dialog:any;
  public src;



  faFlask = faFlask;
  lab: ILab;
  selectedLabStep = -1;
  triggerDialogB = false;
  selectedStepDescription;
  labDescription;
  lastVisitedStepId;
  discussionChat: IDiscussion;
  routeSubscriptions = [];
  codeHighlighted = false;
  // @ViewChild('introContent') private content : any;

  constructor(
    private activatedRoute: ActivatedRoute,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta,
    private router: Router,
    private discussionsService: DiscussionsService,
    @Inject(DOCUMENT) private doc: Document,
    private prismJsHighlightCodeService: PrismJsHighlightCodeService,
    private dialogService: NbDialogService
  ) { }

  ngOnInit() {

    this.routeSubscriptions.push(
      this.activatedRoute.params.subscribe(data => {
        this.getLab(data.lab_id);
      })
    );
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    for (const subs of this.routeSubscriptions) {
      subs.unsubscribe();
    }
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
    this.meta.updateTag(
      {
        name: 'og:image',
        content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag(
      {
        name: 'og:image:secure_url',
        content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({ name: 'og:title', content: `${this.lab.name} | By ${this.lab.user.name}` });
    this.meta.updateTag({
      name: 'og:description',
      content: this.lab.description.replace(/<[^>]*>/g, '').substring(0, 200)
    });
    this.meta.updateTag({ name: 'og:type', content: 'article'});

    this.meta.updateTag(
      {
        name: 'twitter:image',
        content: `${this.lab.header_image ? this.lab.header_image.url : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.lab.name} | By ${this.lab.user.name}` });
    this.meta.updateTag({
      name: 'twitter:description',
      content: this.lab.description.replace(/<[^>]*>/g, '').substring(0, 200)
    });

  }



  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  }

  getLab(labId) {
    this.labsService.pShow(labId).subscribe(
      data => {
        this.lab = data;
        this.setMeta();
        this.labDescription = this.sanitizer.bypassSecurityTrustHtml(this.lab.description);
        this.triggerDialogB = false;
        this.lastVisitedStepId = this.lab.last_visited_step_id;
        this.getDiscussionChat();
        this.highlightCodeSnippets();

        if (this.activatedRoute.firstChild) {
          this.routeSubscriptions.push(
            this.activatedRoute.firstChild.params.subscribe(data => {
              if (data.step_id) {
                this.selectedLabStep = this.lab.lab_steps.findIndex(k => k.id == data.step_id);
                this.setStep(this.selectedLabStep);
              }
            })
          );
        }
      }
    );
  }


ngAfterViewChecked()
{

  if(!this.triggerDialogB)
  {
    if(this.iContent){
      let imagesList = this.iContent.nativeElement.querySelectorAll("img");
      for(let i=0;i<imagesList.length;i++)
      {
         let g0 = imagesList[i];
         console.log(g0)
         g0.addEventListener("click", ()=>{
          this.src = g0.src;
          this.dialogService.open(this.dialog)
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
    this.discussionsService.pGetOrCreateForLabChat(this.lab.id).subscribe(
      data => this.discussionChat = data
    );
  }

  scroll(el) {
    el.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"});
  }


}
