import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EventUpdatesService } from 'apps/commudle-admin/src/app/services/event-updates.service';
import { EEventStatuses } from 'apps/shared-models/enums/event_statuses.enum';
import { IEvent } from 'apps/shared-models/event.model';
import { IEventUpdate } from 'apps/shared-models/event_update.model';
import * as moment from 'moment';

@Component({
  selector: 'app-event-updates',
  templateUrl: './event-updates.component.html',
  styleUrls: ['./event-updates.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EventUpdatesComponent implements OnInit {
  event: IEvent;
  moment = moment;
  EEventStatuses = EEventStatuses;

  eventUpdates: IEventUpdate[] = [];

  eventUpdateForm;

  constructor(
    private eventUpdatesService: EventUpdatesService,
    private fb: FormBuilder,
    private changeDetectorRef: ChangeDetectorRef,
    private activatedRoute: ActivatedRoute,
  ) {
    this.eventUpdateForm = this.fb.group({
      details: ['', Validators.required],
    });
  }

  ngOnInit() {
    this.activatedRoute.parent.data.subscribe((value) => {
      this.event = value.event;
      this.getEventUpdates();
    });
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
