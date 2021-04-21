import { DiscussionsService } from "projects/commudle-admin/src/app/services/discussions.service";
import { IDiscussion } from "./../../../../../../../shared-models/discussion.model";
import { ISpeakerResource } from "projects/shared-models/speaker_resource.model";
import * as moment from "moment";
import { Component, OnDestroy, OnInit } from "@angular/core";
import { SpeakerResourcesService } from "projects/commudle-admin/src/app/services/speaker-resources.service";
import { ActivatedRoute } from "@angular/router";
import { ICommunity } from "projects/shared-models/community.model";
import { Subscription } from "rxjs";

@Component({
  selector: "app-speaker-resource",
  templateUrl: "./speaker-resource.component.html",
  styleUrls: ["./speaker-resource.component.scss"],
})
export class SpeakerResourceComponent implements OnInit, OnDestroy {
  speaker: ISpeakerResource;
  moment = moment;
  community: ICommunity;

  discussion: IDiscussion;
  discussionChat: IDiscussion;
  messagesCount: number;

  subscriptions: Subscription[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private discussionService: DiscussionsService
  ) {}

  ngOnInit(): void {

    this.subscriptions.push(this.activatedRoute.params.subscribe((params) => {
      let speakerId = params["speaker_resource_id"];
      this.getSpeaker(speakerId);
      this.getDiscussionChat(speakerId);
    }));
  }

  ngOnDestroy() {
    for (let sub of this.subscriptions) {
      sub.unsubscribe();
    }
  }

  getSpeaker(speakerId) {
    this.speakerResourcesService.getDetails(speakerId).subscribe((data) => {
      this.speaker = data;
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
}
