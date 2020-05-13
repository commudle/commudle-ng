import { Component, OnInit } from '@angular/core';
import { IDataFormEntityResponseGroup } from 'projects/shared-models/data_form_entity_response_group.model';
import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';
import { ITrackSlot } from 'projects/shared-models/track-slot.model';
import { TrackSlotsService } from 'projects/commudle-admin/src/app/services/track_slots.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-speaker-session-page',
  templateUrl: './speaker-session-page.component.html',
  styleUrls: ['./speaker-session-page.component.scss']
})
export class SpeakerSessionPageComponent implements OnInit {

  trackSlot: ITrackSlot;
  dataFormEntityResponseGroup: IDataFormEntityResponseGroup;
  speakerResource: ISpeakerResource;


  constructor(
    private activatedRoute: ActivatedRoute,
    private trackSlotsService: TrackSlotsService
  ) { }

  ngOnInit() {
    this.getTrackSlot();
  }

  getTrackSlot() {
    this.trackSlotsService.getTrackSlot(this.activatedRoute.snapshot.params['track_slot_id']).subscribe(
      data => {
        this.trackSlot = data;
      }
    );
  }

  getUserDetails() {

  }

  getSpeakerResource() {

  }

}
