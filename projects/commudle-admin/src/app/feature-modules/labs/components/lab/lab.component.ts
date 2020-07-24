import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabsService } from '../../services/labs.service';
import { ILab } from 'projects/shared-models/lab.model';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, Title, Meta } from '@angular/platform-browser';
import { faFlask } from '@fortawesome/free-solid-svg-icons';
import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from 'projects/shared-models/discussion.model';
import { LibAuthwatchService } from 'projects/shared-services/lib-authwatch.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit, OnDestroy {
  faFlask = faFlask;
  lab: ILab;
  selectedLabStep = -1;
  selectedStepDescription;
  labDescription;
  lastVisitedStepId;
  discussionChat: IDiscussion;
  routeSubscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private labsService: LabsService,
    private sanitizer: DomSanitizer,
    private title: Title,
    private meta: Meta,
    private discussionsService: DiscussionsService,
  ) { }

  ngOnInit() {

    this.routeSubscription = this.activatedRoute.params.subscribe(data => {
      this.getLab(data.lab_id);
    });
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.routeSubscription.unsubscribe();
  }

  setMeta() {
    this.title.setTitle(this.lab.name);
    this.meta.updateTag(
      {
        name: 'og:image',
        content: `${this.lab.header_image ? this.lab.header_image : 'https://commudle.com/assets/images/commudle-logo192.png'}`
      });
    this.meta.updateTag({ name: 'og:title', content: this.lab.name });
    this.meta.updateTag({
      name: 'og:description',
      content: this.lab.description.replace(/<[^>]*>/g, '')
    });
    this.meta.updateTag({ name: 'og:type', content: 'article'});
  }

  getLab(labId) {
    this.labsService.pShow(labId).subscribe(
      data => {
        this.lab = data;
        this.setMeta();
        this.labDescription = this.sanitizer.bypassSecurityTrustHtml(this.lab.description);
        this.lastVisitedStepId = this.lab.last_visited_step_id;
        this.getDiscussionChat();
      }
    );
  }


  setStep(index) {
    this.lastVisitedStepId = null;
    this.selectedLabStep = index;
    this.lastVisitedStepId = null;
  }

  changeStep(count) {
    this.selectedLabStep += count;
    this.lastVisitedStepId = null;
  }

  getDiscussionChat() {
    this.discussionsService.pGetOrCreateForLabChat(this.lab.id).subscribe(
      data => this.discussionChat = data
    );
  }

  scroll(el) {
    el.scrollIntoView({block: "start", inline: "nearest", behavior: "smooth"})
  }


}
