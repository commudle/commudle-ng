import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { IEvent } from '@commudle/shared-models';
import { ISponsor } from '@commudle/shared-models';
import { IEventSponsor } from '@commudle/shared-models';
import { EventSponsorsService } from 'apps/commudle-admin/src/app/services/event-sponsors.service';

@Component({
  selector: 'commudle-sponsors',
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
