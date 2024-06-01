import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import * as moment from 'moment';
import { DiscussionsService } from 'apps/commudle-admin/src/app/services/discussions.service';
import { SpeakerResourcesService } from 'apps/commudle-admin/src/app/services/speaker-resources.service';
import { ICommunity } from 'apps/shared-models/community.model';
import { IDiscussion } from 'apps/shared-models/discussion.model';
import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';
import { SeoService } from 'apps/shared-services/seo.service';
import { Subscription } from 'rxjs';
import { EAttachmentType } from '@commudle/shared-models';
@Component({
  selector: 'app-speaker-resource',
  templateUrl: './speaker-resource.component.html',
  styleUrls: ['./speaker-resource.component.scss'],
})
export class SpeakerResourceComponent implements OnInit, OnDestroy {
  speakerResource: ISpeakerResource;
  moment = moment;
  community: ICommunity;

  discussionChat: IDiscussion;
  messagesCount: number;

  subscriptions: Subscription[] = [];
  iframe;
  EAttachmentType = EAttachmentType;

  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private discussionService: DiscussionsService,
    private seoService: SeoService,
    private domSanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.subscriptions.push(
      this.activatedRoute.params.subscribe((params) => {
        this.getSpeakerResource(params.speaker_resource_id);
        this.getDiscussionChat(params.speaker_resource_id);
      }),
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach((value) => value.unsubscribe());
  }

  getSpeakerResource(speakerId) {
    this.subscriptions.push(
      this.speakerResourcesService.getDetails(speakerId).subscribe((data) => {
        this.speakerResource = data;
        if (this.speakerResource.embedded_content) {
          this.iframe = this.domSanitizer.bypassSecurityTrustHtml(this.speakerResource.embedded_content);
        }
        this.setMeta();
      }),
    );
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({ block: 'start', inline: 'nearest', behavior: 'smooth' });
  }

  getDiscussionChat(speakerId) {
    this.subscriptions.push(
      this.discussionService.pGetOrCreateForSpeakerResourceChat(speakerId).subscribe((data) => {
        this.discussionChat = data;
      }),
    );
  }

  setMeta() {
    const description = this.speakerResource.title
      ? `${this.speakerResource.title} by ${this.speakerResource.user.name}`
      : `Talk at ${this.speakerResource.event.name}`;
    this.seoService.setTags(
      description,
      `Session by ${this.speakerResource.user.name} at ${this.speakerResource.event.name} on ${this.speakerResource.title}`,
      this.speakerResource.user.avatar,
    );
  }
}
