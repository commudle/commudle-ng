import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { EventsService } from 'projects/commudle-admin/src/app/services/events.service';
import { EEventStatuses } from 'projects/shared-models/enums/event_statuses.enum';
import { IEvent } from 'projects/shared-models/event.model';
import { IEventStatus } from 'projects/shared-models/event_status.model';
import { LibToastLogService } from 'projects/shared-services/lib-toastlog.service';

@Component({
  selector: 'app-event-status',
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
