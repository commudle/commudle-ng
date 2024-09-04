import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SeoService } from '@commudle/shared-services';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEventDataFormEntityGroup } from 'apps/shared-models/event_data_form_enity_group.model';

@Component({
  selector: 'commudle-speaker-cfp',
  templateUrl: './speaker-cfp.component.html',
  styleUrls: ['./speaker-cfp.component.scss'],
})
export class SpeakerCfpComponent implements OnInit {
  speakerForms: IEventDataFormEntityGroup[] = [];
  skeletonLoaderCard = true;
  loading = false;
  count = 9;
  page = 1;
  total = 0;

  constructor(
    private eventsService: EventsService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private seoService: SeoService,
  ) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.page) {
      this.page = Number(this.activatedRoute.snapshot.queryParams.page);
    }
    this.getSpeakersFormsList();
    this.setMeta();
  }

  getSpeakersFormsList() {
    this.loading = true;
    this.eventsService.pGetSpeakerEdfegList(this.page, this.count).subscribe((data) => {
      this.speakerForms = data.values;
      this.skeletonLoaderCard = false;
      this.loading = false;
      this.total = data.total;
      this.count = data.count;
      // this.router.navigate([], { queryParams: { page: this.page } });
      // });
    });
  }

  setMeta(): void {
    this.seoService.setTags(
      'Call for Speakers - Apply to Speak at an Event',
      'Here is a list of all the events which are looking for a speaker for their upcoming event. Apply to show your interest at any of these events.',
      'https://commudle.com/assets/images/commudle-logo192.png',
    );
  }
}
