import { ISpeakerResource } from 'projects/shared-models/speaker_resource.model';

import { Component, OnInit } from '@angular/core';
import { SpeakerResourcesService } from 'projects/commudle-admin/src/app/services/speaker-resources.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-speaker-resource',
  templateUrl: './speaker-resource.component.html',
  styleUrls: ['./speaker-resource.component.scss']
})
export class SpeakerResourceComponent implements OnInit {


  speaker :ISpeakerResource;


  constructor(
    private activatedRoute: ActivatedRoute,
    private speakerResourcesService: SpeakerResourcesService,

  ) { }

  ngOnInit(): void {
    this.activatedRoute.parent.data.subscribe(data => {
        this.getSpeaker();
      }
    )
  }
  getSpeaker(){
    console.log(this.speaker.id);
    this.speakerResourcesService.getDetails(this.speaker.id).subscribe(
      data => {
        console.log(data);
        this.speaker = data;

      }
    );
  }
}
