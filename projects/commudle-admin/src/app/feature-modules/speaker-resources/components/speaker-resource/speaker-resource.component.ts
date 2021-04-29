import { DiscussionsService } from "projects/commudle-admin/src/app/services/discussions.service";
import { IDiscussion } from "./../../../../../../../shared-models/discussion.model";
import { ISpeakerResource } from "projects/shared-models/speaker_resource.model";
import * as moment from "moment";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpeakerResourcesService } from "projects/commudle-admin/src/app/services/speaker-resources.service";
import { ActivatedRoute } from "@angular/router";
import { ICommunity } from "projects/shared-models/community.model";
import { Subscription } from "rxjs";
import { Meta, Title } from "@angular/platform-browser";

@Component({
  selector: "app-speaker-resource",
  templateUrl: "./speaker-resource.component.html",
  styleUrls: ["./speaker-resource.component.scss"],
})
export class SpeakerResourceComponent implements OnInit, OnDestroy {
  speakerResource: ISpeakerResource;
  moment = moment;
  community: ICommunity;

  discussion: IDiscussion;
  discussionChat: IDiscussion;
  messagesCount: number;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private discussionService: DiscussionsService,
    private title: Title,
    private meta: Meta
  ) {}

  ngOnInit(): void {

    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      let speakerId = params["speaker_resource_id"];
      this.getSpeakerResource(speakerId);
      this.getDiscussionChat(speakerId);
    }));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getSpeakerResource(speakerId) {
    this.speakerResourcesService.getDetails(speakerId).subscribe((data) => {
      this.speakerResource = data;
      this.setMeta();
    });
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView({block: 'start', inline: 'nearest', behavior: 'smooth'});
  }

  getMessagesCount(count: number) {
    this.messagesCount = count;
  }

  getDiscussionChat(speakerId) {
    this.discussionService
      .pGetOrCreateForSpeakerResourceChat(speakerId)
      .subscribe((data) => (this.discussionChat = data));
  }


  setMeta() {
    this.title.setTitle(`${this.speakerResource.title} by ${this.speakerResource.user.name}`);
    this.meta.updateTag({ name: 'description', content: `Session by ${this.speakerResource.user.name} at ${this.speakerResource.event.name} on ${this.speakerResource.title}`});


    this.meta.updateTag({ name: 'og:image', content: `${this.speakerResource.user.avatar}` });
    this.meta.updateTag({ name: 'og:image:secure_url', content: `${this.speakerResource.user.avatar}` });
    this.meta.updateTag({ name: 'og:title', content: `${this.speakerResource.title} by ${this.speakerResource.user.name}` });
    this.meta.updateTag({ name: 'og:description', content: `Session by ${this.speakerResource.user.name} at ${this.speakerResource.event.name} on ${this.speakerResource.title}`});
    this.meta.updateTag( { name: 'og:type', content: 'website'});

    this.meta.updateTag({ name: 'twitter:image', content: 'https://commudle.com/assets/images/commudle-logo192.png' });
    this.meta.updateTag({ name: 'twitter:title', content: `${this.speakerResource.title} by ${this.speakerResource.user.name}` });
    this.meta.updateTag({ name: 'twitter:description', content: `Session by ${this.speakerResource.user.name} at ${this.speakerResource.event.name} on ${this.speakerResource.title}`});
  }
}
