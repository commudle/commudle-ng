import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ISpeakerResource } from '@commudle/shared-models';
import { SpeakerResourcesService } from 'apps/commudle-admin/src/app/services/speaker-resources.service';

@Component({
  selector: 'commudle-speaker-slides',
  templateUrl: './speaker-slides.component.html',
  styleUrls: ['./speaker-slides.component.scss'],
})
export class SpeakerSlidesComponent implements OnInit {
  speakerSlides: ISpeakerResource[] = [];
  skeletonLoaderCard = true;
  loading = false;
  count = 9;
  page = 1;
  total = 0;

  constructor(
    private speakerResourcesService: SpeakerResourcesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.page) {
      this.page = Number(this.activatedRoute.snapshot.queryParams.page);
    }
    this.getSpeakersSlidesList();
  }

  getSpeakersSlidesList() {
    this.loading = true;
    this.speakerResourcesService.pGetSpeakerResources(this.page, this.count).subscribe((data) => {
      this.speakerSlides = data.values;
      this.skeletonLoaderCard = false;
      this.loading = false;
      this.total = data.total;
      this.count = data.count;
      this.total = data.total;
      // this.router.navigate([], { queryParams: { page: this.page } });
    });
  }
}
