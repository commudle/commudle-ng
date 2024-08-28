import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(private eventsService: EventsService, private activatedRoute: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    if (this.activatedRoute.snapshot.queryParams.page) {
      this.page = Number(this.activatedRoute.snapshot.queryParams.page);
    }
    this.getSpeakersFormsList();
  }

  getSpeakersFormsList() {
    this.loading = true;
    this.eventsService.pGetSpeakerEdfegList().subscribe((data) => {
      console.log(data);
      this.speakerForms = data.values;
      this.skeletonLoaderCard = false;
      this.loading = false;
      // this.total = data.total;
      // this.count = data.count;
      // this.total = data.total;
      // this.router.navigate([], { queryParams: { page: this.page } });
      // });
    });
  }
}
