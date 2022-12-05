import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import * as moment from 'moment';
@Component({
  selector: 'app-event-updates',
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
