import { Component, OnInit } from '@angular/core';
import { ISpeakerResource } from '@commudle/shared-models';
import { SpeakerResourcesService } from 'apps/commudle-admin/src/app/services/speaker-resources.service';
// import { ISpeakerResource } from 'apps/shared-models/speaker_resource.model';

@Component({
  selector: 'commudle-speaker-slides',
  templateUrl: './speaker-slides.component.html',
  styleUrls: ['./speaker-slides.component.scss'],
})
export class SpeakerSlidesComponent implements OnInit {
  speakerSlides = [];
  skeletonLoaderCard = true;
  total: number;
  loading = false;

  constructor(private speakerResourcesService: SpeakerResourcesService) {}

  ngOnInit(): void {
    this.getSpeakersSlidesList();
  }

  getSpeakersSlidesList() {
    this.speakerResourcesService.pGetSpeakerResources().subscribe((data) => {
      this.speakerSlides = data.values;
      this.skeletonLoaderCard = false;
      this.loading = false;
      this.total = data.total;
      // this.page = data.page;
      // this.count = data.count;
    });
  }
}
