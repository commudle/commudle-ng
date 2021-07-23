import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { IEvent } from 'projects/shared-models/event.model';
import { IHmsRecording } from 'projects/shared-modules/hms-video/models/hms-recording.model';
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
