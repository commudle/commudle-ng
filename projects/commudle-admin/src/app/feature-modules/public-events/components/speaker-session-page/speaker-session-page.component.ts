import { Component, OnInit } from '@angular/core';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';
import { ActivatedRoute } from '@angular/router';
import { IUser } from 'projects/shared-models/user.model';
import * as moment from 'moment';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { CommunitiesService } from 'projects/commudle-admin/src/app/services/communities.service';
import { DomSanitizer, Title } from '@angular/platform-browser';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';

@Component({
  selector: 'app-speaker-session-page',
  templateUrl: './speaker-session-page.component.html',
  styleUrls: ['./speaker-session-page.component.scss']
})
export class SpeakerSessionPageComponent implements OnInit {

  trackSlot: ITrackSlot;
  speaker: IUser;
  community: ICommunity;
  event: IEvent;
  dataFormEntityResponseGroup: IDataFormEntityResponseGroup;
  speakerResource: ISpeakerResource;
  EEventStatuses = EEventStatuses;
  moment = moment;


  constructor(
    private activatedRoute: ActivatedRoute,
    private trackSlotsService: TrackSlotsService,
    private eventsService: EventsService,
    private communitiesService: CommunitiesService,
    private sanitizer: DomSanitizer,
    private title: Title
  ) { }

  ngOnInit() {
    this.getTrackSlot();
  }

  getTrackSlot() {
    this.trackSlotsService.pGetTrackSlot(this.activatedRoute.snapshot.params['track_slot_id']).subscribe(
      data => {
        this.trackSlot = data;
        this.speaker = data.user;
        this.title.setTitle(`${this.speaker.name} | ${this.trackSlot.session_title}`)
        this.getEvent();
      }
    );
  }


  getEvent() {
    this.eventsService.pGetEvent(this.trackSlot.event_id).subscribe(
      data => {
        this.event = data;
        this.getCommunity();
      }
    );
  }

  getCommunity() {
    this.communitiesService.getCommunityDetails(this.event.kommunity_id).subscribe(
      data => this.community = data
    );
  }

  sanitizedEmbeddedHTML(val) {
    return this.sanitizer.bypassSecurityTrustHtml(val);
  }


}
