import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from '@commudle/shared-models';
import { IEvent } from '@commudle/shared-models';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { IEventUpdate } from '@commudle/shared-models';
import * as moment from 'moment';
@Component({
  selector: 'commudle-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss']
})
export class EventUpdatesComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasUpdates = new EventEmitter();

  eventUpdates: IEventUpdate[] = [];

  constructor(
    private eventUpdatesService: EventUpdatesService
  ) { }

  ngOnInit() {
    this.getEventUpdates();
  }

  getEventUpdates() {
    this.eventUpdatesService.pGetEventUpdates(this.event.id).subscribe(
      data => {
        this.eventUpdates = data.event_updates;
        if (this.eventUpdates.length > 0) {
          this.hasUpdates.emit(true);
        }
      }
    );
  }

}
