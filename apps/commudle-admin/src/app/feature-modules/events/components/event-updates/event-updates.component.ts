import { Component, OnInit, Input } from '@angular/core';
import { IEvent } from '@commudle/shared-models';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { IEventUpdate } from '@commudle/shared-models';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'commudle-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss']
})
export class EventUpdatesComponent implements OnInit {
  @Input() event: IEvent;
  moment = moment;

  eventUpdates: IEventUpdate[] = [];

  eventUpdateForm = this.fb.group({
    details: ['', Validators.required]
  });

  constructor(
    private eventUpdatesService: EventUpdatesService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getEventUpdates();
  }


  getEventUpdates() {
    this.eventUpdatesService.getEventUpdates(this.event.id).subscribe(
      data => {
        this.eventUpdates = data.event_updates;
      }
    );
  }


  createEventUpdate() {
    this.eventUpdatesService.createEventUpdate(this.eventUpdateForm.value, this.event.id).subscribe(
      data => {
        this.eventUpdates.unshift(data);
        this.eventUpdateForm.reset();
      }
    );
  }


  deleteEventUpdate(eventUpdateId, index) {
    this.eventUpdatesService.deleteEventUpdate(eventUpdateId).subscribe(
      data => {
        this.eventUpdates.splice(index, 1);
      }
    );
  }

}
