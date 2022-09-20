import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EEventStatuses, IEvent, IEventStatus } from '@commudle/shared-models';
import { EventsService, LibToastLogService } from '@commudle/shared-services';

@Component({
  selector: 'commudle-event-status',
  templateUrl: './event-status.component.html',
  styleUrls: ['./event-status.component.scss'],
})
export class EventStatusComponent implements OnInit {
  @Input() event: IEvent;
  @Output() updatedEventStatus: EventEmitter<IEventStatus> = new EventEmitter<IEventStatus>();

  eventStatuses: string[] = Object.values(EEventStatuses);

  constructor(private eventsService: EventsService, private toastLogService: LibToastLogService) {}

  ngOnInit() {}

  updateStatus(status: string) {
    if (!status || status === this.event.event_status.name) return;

    this.eventsService.updateStatus(this.event.id, status).subscribe((value: IEventStatus) => {
      this.updatedEventStatus.emit(value);
      this.toastLogService.successDialog('Status Updated!');
    });
  }
}
