import { ChangeDetectionStrategy, Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { IEvent } from 'projects/shared-models/event.model';
import { EventUpdatesService } from 'projects/commudle-admin/src/app/services/event-updates.service';
import { IEventUpdate } from 'projects/shared-models/event_update.model';
import { FormBuilder, Validators } from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventUpdatesComponent implements OnInit {
  @Input() event: IEvent;
  moment = moment;

  eventUpdates: IEventUpdate[] = [];

  eventUpdateForm = this.fb.group({
    details: ['', Validators.required],
  });

  constructor(
    private eventUpdatesService: EventUpdatesService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.getEventUpdates();
  }

  getEventUpdates() {
    this.eventUpdatesService.getEventUpdates(this.event.id).subscribe((data) => {
      this.eventUpdates = data.event_updates;
      this.changeDetectorRef.markForCheck();
    });
  }

  createEventUpdate() {
    this.eventUpdatesService.createEventUpdate(this.eventUpdateForm.value, this.event.id).subscribe((data) => {
      this.eventUpdates.unshift(data);
      this.eventUpdateForm.reset();
      this.changeDetectorRef.markForCheck();
    });
  }

  deleteEventUpdate(eventUpdateId, index) {
    this.eventUpdatesService.deleteEventUpdate(eventUpdateId).subscribe((data) => {
      this.eventUpdates.splice(index, 1);
      this.changeDetectorRef.markForCheck();
    });
  }
}
