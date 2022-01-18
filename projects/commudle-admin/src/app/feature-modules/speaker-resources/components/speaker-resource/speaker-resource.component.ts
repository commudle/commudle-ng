import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {DiscussionsService} from 'projects/commudle-admin/src/app/services/discussions.service';
import {ISpeakerResource} from 'projects/shared-models/speaker_resource.model';
import * as moment from 'moment';
import {SpeakerResourcesService} from 'projects/commudle-admin/src/app/services/speaker-resources.service';
import {ICommunity} from 'projects/shared-models/community.model';
import {Subscription} from 'rxjs';
import {IDiscussion} from 'projects/shared-models/discussion.model';
import { SeoService } from 'projects/shared-services/seo.service';

@Component({
  selector: 'app-speaker-resource',
  templateUrl: './speaker-resource.component.html',
  styleUrls: ['./speaker-resource.component.scss'],
})
export class SpeakerResourceComponent implements OnInit, OnDestroy {

  speakerResource: ISpeakerResource;
  moment = moment;
  community: ICommunity;

  discussion: IDiscussion;
  discussionChat: IDiscussion;
  messagesCount: number;

  subscriptions: Subscription[] = [];
  iframe;

  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private discussionService: DiscussionsService,
    private seoService : SeoService,
    private domSanitizer: DomSanitizer
  ) {
  }

  ngOnInit(): void {
    this.subscriptions.push(this.activatedRoute.params.subscribe(params => {
      const speakerId = params.speaker_resource_id;
      this.getSpeakerResource(speakerId);
      this.getDiscussionChat(speakerId);
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  getSpeakerResource(speakerId) {
    this.subscriptions.push(this.speakerResourcesService.getDetails(speakerId).subscribe(data => {
      this.speakerResource = data;
      if (this.speakerResource.embedded_content) {
        this.iframe = this.domSanitizer.bypassSecurityTrustHtml(this.speakerResource.embedded_content);
      }
      this.setMeta();
    }));
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
  }

  getDiscussionChat(speakerId) {
    this.subscriptions.push(this.discussionService.pGetOrCreateForSpeakerResourceChat(speakerId).subscribe(data => {
      this.discussionChat = data;
    }));
  }


  setMeta() {
    this.seoService.setTags(
      `${this.speakerResource.title} by ${this.speakerResource.user.name}`,
      `Session by ${this.speakerResource.user.name} at ${this.speakerResource.event.name} on ${this.speakerResource.title}`,
      `${this.speakerResource.user.avatar}`
    );
  }
}
