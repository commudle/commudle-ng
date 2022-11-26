import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from 'apps/commudle-admin/src/app/services/events.service';
import { IEvent } from 'apps/shared-models/event.model';
import { IHmsRecording } from 'apps/shared-modules/hms-video/models/hms-recording.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-event-recordings',
  templateUrl: './event-recordings.component.html',
  styleUrls: ['./event-recordings.component.scss'],
})
export class EventRecordingsComponent implements OnInit, OnDestroy {
  @Input() event: IEvent;

  recordings: IHmsRecording[] = [];

  subscription: Subscription;

  constructor(private eventsService: EventsService) {
    // do nothing
  }

  ngOnInit(): void {
    this.getRecordings();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  getRecordings(): void {
    this.subscription = this.eventsService.getRecordings(this.event.id).subscribe((value) => {
      this.recordings = value;
    });
  }
}
