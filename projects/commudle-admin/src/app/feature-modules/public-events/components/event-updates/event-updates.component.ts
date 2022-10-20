import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { ICommunity } from 'projects/shared-models/community.model';
import { IEvent } from 'projects/shared-models/event.model';
import { EventUpdatesService } from 'projects/commudle-admin/src/app/services/event-updates.service';
import { IEventUpdate } from 'projects/shared-models/event_update.model';
import * as moment from 'moment';
@Component({
  selector: 'app-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventUpdatesComponent implements OnInit {
  moment = moment;

  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasUpdates = new EventEmitter();

  eventUpdates: IEventUpdate[] = [];

  constructor(private eventUpdatesService: EventUpdatesService) {}

  ngOnInit() {
    this.getEventUpdates();
  }

  getEventUpdates() {
    this.eventUpdatesService.pGetEventUpdates(this.event.id).subscribe((data) => {
      this.eventUpdates = data.event_updates;
      if (this.eventUpdates.length > 0) {
        this.hasUpdates.emit(true);
      }
    });
  }
}
