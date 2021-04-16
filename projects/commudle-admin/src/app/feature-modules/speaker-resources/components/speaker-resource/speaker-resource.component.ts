import { DiscussionsService } from 'projects/commudle-admin/src/app/services/discussions.service';
import { IDiscussion } from './../../../../../../../shared-models/discussion.model';
import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';
import * as moment from 'moment';
import { Component, OnInit } from '@angular/core';
import { SpeakerResourcesService } from 'projects/commudle-admin/src/app/services/speaker-resources.service';
import { ActivatedRoute } from '@angular/router';
import { ICommunity } from 'projects/shared-models/community.model';


@Component({
  selector: 'app-speaker-resource',
  templateUrl: './speaker-resource.component.html',
  styleUrls: ['./speaker-resource.component.scss']
})
export class SpeakerResourceComponent implements OnInit {


  speaker :ISpeakerResource;
  speaker_id;
  moment = moment;
  community: ICommunity;

  discussion : IDiscussion;



  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,
    private discussionService : DiscussionsService,

  ) { }

  ngOnInit(): void {

    this.speaker_id = this.activatedRoute.snapshot.params['speaker_resource_id'];
    this.activatedRoute.parent.data.subscribe(data => {
        this.getSpeaker(this.speaker_id);
      }
    )
  }
  getSpeaker(speaker_id){
    this.speakerResourcesService.getDetails(speaker_id).subscribe(
      data => {
        this.speaker = data;
      }
    );
  }
}
