import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ICommunity } from 'apps/shared-models/community.model';
import { IEvent } from 'apps/shared-models/event.model';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import * as moment from 'moment';
import { IPageInfo } from '@commudle/shared-models';
@Component({
  selector: 'app-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss'],
})
export class EventUpdatesComponent implements OnInit {
  @Input() community: ICommunity;
  @Input() event: IEvent;
  @Output() hasUpdates = new EventEmitter();

  eventUpdates: IEventUpdate[] = [];
  moment = moment;
  page_info: IPageInfo;
  limit = 5;

  constructor(private eventUpdatesService: EventUpdatesService) {}

  ngOnInit() {
    this.getEventUpdates();
  }

  getEventUpdates() {
    this.eventUpdatesService
      .pGetEventUpdates(this.event.id, this.limit, this.page_info?.end_cursor)
      .subscribe((data) => {
        this.eventUpdates = this.eventUpdates.concat(data.page.reduce((acc, value) => [...acc, value.data], []));
        this.page_info = data.page_info;
        if (this.eventUpdates.length > 0) {
          this.hasUpdates.emit(true);
        }
      });
  }
}
