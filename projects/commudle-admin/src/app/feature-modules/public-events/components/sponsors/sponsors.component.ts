import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { ISponsor } from 'projects/shared-models/sponsor.model';
import { IEventSponsor } from 'projects/shared-models/event_sponsor.model';
import { EventSponsorsService } from 'projects/commudle-admin/src/app/services/event-sponsors.service';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {
  @Input() event: IEvent;
  sponsors: IEventSponsor[] = [];
  @Output() hasSponsors = new EventEmitter();

  constructor(
    private eventSponsorsService: EventSponsorsService
  ) { }

  ngOnInit() {
    this.getSponsors();
  }

  getSponsors() {
    this.eventSponsorsService.pIndex(this.event.slug).subscribe(
      data => {
        this.sponsors = data.event_sponsors;
        if (this.sponsors.length > 0) {
          this.hasSponsors.emit(true);
        }
      }
    );
  }

}
